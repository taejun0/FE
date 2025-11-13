export class ApiError<T = unknown> extends Error {
  status: number;
  body: T | null;

  constructor(message: string, status: number, body: T | null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

type ApiFetchOptions = RequestInit & {
  skipJsonParse?: boolean;
  skipAuth?: boolean;
  skipContentType?: boolean;
};

const ensureLeadingSlash = (path: string) =>
  path.startsWith('/') ? path : `/${path}`;

const getBaseUrl = () => {
  const raw = import.meta.env.VITE_BASE_URL ?? '';
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
};

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

// 요청 큐 타입 정의
type QueuedRequest = {
  path: string;
  options: ApiFetchOptions;
  resolve: (value: any) => void;
  reject: (error: ApiError) => void;
};

const requestQueue: QueuedRequest[] = [];

// 큐된 요청을 처리하는 헬퍼 함수 (재귀 방지)
const processQueuedRequest = async <T>(
  path: string,
  options: ApiFetchOptions,
  accessToken: string
): Promise<T> => {
  const baseUrl = getBaseUrl();
  if (!baseUrl) {
    throw new ApiError('서버 주소가 설정되지 않았습니다.', 0, null);
  }

  const {
    skipJsonParse = false,
    skipContentType = false,
    skipAuth = false,
    headers,
    ...rest
  } = options;

  const requestHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...((headers as Record<string, string>) ?? {}),
  };

  if (!skipContentType && !requestHeaders['Content-Type']) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  if (!skipAuth && accessToken) {
    requestHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${baseUrl}${ensureLeadingSlash(path)}`, {
    ...rest,
    headers: requestHeaders,
  });

  const data = skipJsonParse
    ? null
    : await response.json().catch(() => null as unknown as T);

  if (!response.ok) {
    const message =
      (data && typeof data === 'object' && 'message' in data
        ? (data as { message?: string }).message
        : null) || '요청 처리에 실패했습니다.';

    throw new ApiError(message, response.status, data);
  }

  return data as T;
};

const performRefresh = async (): Promise<string | null> => {
  if (isRefreshing && refreshPromise) {
    console.log('[Token Refresh] 이미 재생성 중이므로 대기...');
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const { getRefreshToken, setAccessToken, clearAuth } = await import(
        './authService'
      );
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        console.warn('[Token Refresh] Refresh token이 없습니다.');
        clearAuth();
        return null;
      }

      const baseUrl = getBaseUrl();
      if (!baseUrl) {
        console.error('[Token Refresh] Base URL이 설정되지 않았습니다.');
        return null;
      }

      console.log('[Token Refresh] 토큰 재생성 시도...', {
        baseUrl,
        hasRefreshToken: !!refreshToken,
      });
      const response = await fetch(`${baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      console.log(
        '[Token Refresh] 응답 상태:',
        response.status,
        response.statusText
      );

      let data: any = null;
      try {
        const text = await response.text();
        console.log('[Token Refresh] 응답 본문 (raw):', text);
        data = text ? JSON.parse(text) : null;
      } catch (parseError) {
        console.error('[Token Refresh] JSON 파싱 실패:', parseError);
        data = null;
      }

      if (!response.ok) {
        console.error('[Token Refresh] 토큰 재생성 실패:', {
          status: response.status,
          statusText: response.statusText,
          data,
        });
        clearAuth();

        // 큐에 있는 모든 요청을 실패 처리
        const queueCopy = [...requestQueue];
        requestQueue.length = 0; // 큐 비우기
        const error = new ApiError(
          '토큰 재발급에 실패했습니다. 다시 로그인해 주세요.',
          response.status,
          data
        );
        queueCopy.forEach((queued) => {
          queued.reject(error);
        });

        return null;
      }

      console.log('[Token Refresh] 응답 데이터:', data);

      // 응답 구조 확인: { message, accessToken } 또는 { accessToken }
      const newAccessToken =
        (data &&
          typeof data === 'object' &&
          'accessToken' in data &&
          typeof data.accessToken === 'string' &&
          data.accessToken.trim()) ||
        null;

      if (newAccessToken) {
        console.log(
          '[Token Refresh] 토큰 재생성 성공, 새 토큰 길이:',
          newAccessToken.length
        );
        setAccessToken(newAccessToken);

        // 큐에 있는 모든 요청을 재시도
        console.log(
          `[Token Refresh] 큐에 있는 ${requestQueue.length}개의 요청 재시도 시작`
        );
        const queueCopy = [...requestQueue];
        requestQueue.length = 0; // 큐 비우기

        // 모든 큐된 요청을 새로운 토큰으로 재시도
        queueCopy.forEach(async (queued) => {
          console.log(`[Token Refresh] 큐된 요청 재시도: ${queued.path}`);
          try {
            const result = await processQueuedRequest(
              queued.path,
              queued.options,
              newAccessToken
            );
            queued.resolve(result);
          } catch (error) {
            queued.reject(
              error instanceof ApiError
                ? error
                : new ApiError('요청 처리에 실패했습니다.', 0, null)
            );
          }
        });

        return newAccessToken;
      }

      console.error('[Token Refresh] 응답에 accessToken이 없습니다:', {
        data,
        dataType: typeof data,
        hasAccessToken: data && 'accessToken' in data,
        accessTokenType: data?.accessToken
          ? typeof data.accessToken
          : 'undefined',
      });
      clearAuth();

      // 큐에 있는 모든 요청을 실패 처리
      const queueCopy = [...requestQueue];
      requestQueue.length = 0; // 큐 비우기
      const error = new ApiError(
        '토큰 재발급에 실패했습니다. 다시 로그인해 주세요.',
        401,
        null
      );
      queueCopy.forEach((queued) => {
        queued.reject(error);
      });

      return null;
    } catch (error) {
      console.error('[Token Refresh] 토큰 재생성 중 예외 발생:', error);
      const { clearAuth } = await import('./authService');
      clearAuth();

      // 큐에 있는 모든 요청을 실패 처리
      const queueCopy = [...requestQueue];
      requestQueue.length = 0; // 큐 비우기
      const apiError = new ApiError(
        '토큰 재발급 중 오류가 발생했습니다. 다시 로그인해 주세요.',
        0,
        null
      );
      queueCopy.forEach((queued) => {
        queued.reject(apiError);
      });

      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

export const apiFetch = async <T = unknown>(
  path: string,
  {
    headers,
    skipJsonParse = false,
    skipAuth = false,
    skipContentType = false,
    ...rest
  }: ApiFetchOptions = {}
): Promise<T> => {
  const baseUrl = getBaseUrl();

  if (!baseUrl) {
    throw new ApiError('서버 주소가 설정되지 않았습니다.', 0, null);
  }

  const makeRequest = async (accessToken: string | null): Promise<Response> => {
    const requestHeaders: Record<string, string> = {
      Accept: 'application/json',
      ...((headers as Record<string, string>) ?? {}),
    };

    if (!skipContentType && !requestHeaders['Content-Type']) {
      requestHeaders['Content-Type'] = 'application/json';
    }

    if (!skipAuth && accessToken) {
      requestHeaders['Authorization'] = `Bearer ${accessToken}`;
    }

    return fetch(`${baseUrl}${ensureLeadingSlash(path)}`, {
      ...rest,
      headers: requestHeaders,
    });
  };

  const { getAccessToken } = await import('./authService');
  let accessToken = skipAuth ? null : getAccessToken();
  let response = await makeRequest(accessToken);

  if (response.status === 401 && !skipAuth) {
    console.log(
      '[API Fetch] 401 에러 발생, 요청을 큐에 추가하고 토큰 재생성 대기...'
    );

    // 요청을 큐에 추가하고 Promise 반환
    return new Promise<T>((resolve, reject) => {
      // 요청 정보를 큐에 추가
      requestQueue.push({
        path,
        options: {
          headers,
          skipJsonParse,
          skipAuth,
          skipContentType,
          ...rest,
        },
        resolve,
        reject,
      });

      console.log(
        `[API Fetch] 큐에 추가됨. 현재 큐 크기: ${requestQueue.length}`
      );

      // 이미 토큰 재생성 중이면 대기만 함
      if (isRefreshing && refreshPromise) {
        console.log('[API Fetch] 이미 토큰 재생성 중이므로 대기...');
        return;
      }

      // 토큰 재생성 시작
      performRefresh().then((newAccessToken) => {
        if (!newAccessToken) {
          // 토큰 재생성 실패 시 큐의 모든 요청은 이미 performRefresh에서 처리됨
          console.error(
            '[API Fetch] 토큰 재생성 실패, 큐의 모든 요청이 실패 처리됨'
          );
        }
        // 성공 시 큐의 모든 요청은 performRefresh 내부에서 재시도됨
      });
    });
  }

  const data = skipJsonParse
    ? null
    : await response.json().catch(() => null as unknown as T);

  if (!response.ok) {
    const message =
      (data && typeof data === 'object' && 'message' in data
        ? (data as { message?: string }).message
        : null) || '요청 처리에 실패했습니다.';

    throw new ApiError(message, response.status, data);
  }

  return data as T;
};
