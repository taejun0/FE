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

const performRefresh = async (): Promise<string | null> => {
  if (isRefreshing && refreshPromise) {
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
        clearAuth();
        return null;
      }

      const baseUrl = getBaseUrl();
      if (!baseUrl) {
        return null;
      }

      const response = await fetch(`${baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        clearAuth();
        return null;
      }

      const newAccessToken =
        (data &&
          typeof data === 'object' &&
          'accessToken' in data &&
          typeof data.accessToken === 'string' &&
          data.accessToken) ||
        null;

      if (newAccessToken) {
        setAccessToken(newAccessToken);
        return newAccessToken;
      }

      clearAuth();
      return null;
    } catch {
      const { clearAuth } = await import('./authService');
      clearAuth();
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
  { headers, skipJsonParse = false, skipAuth = false, skipContentType = false, ...rest }: ApiFetchOptions = {}
): Promise<T> => {
  const baseUrl = getBaseUrl();

  if (!baseUrl) {
    throw new ApiError('서버 주소가 설정되지 않았습니다.', 0, null);
  }

  const makeRequest = async (accessToken: string | null): Promise<Response> => {
    const requestHeaders: HeadersInit = {
      Accept: 'application/json',
      ...(headers ?? {}),
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
    const newAccessToken = await performRefresh();

    if (newAccessToken) {
      accessToken = newAccessToken;
      response = await makeRequest(accessToken);
    } else {
      const data = await response.json().catch(() => null);
      const message =
        (data && typeof data === 'object' && 'message' in data
          ? (data as { message?: string }).message
          : null) || '인증이 만료되었습니다. 다시 로그인해 주세요.';
      throw new ApiError(message, 401, data);
    }
  }

  const data = skipJsonParse
    ? null
    : await response
        .json()
        .catch(() => null as unknown as T);

  if (!response.ok) {
    const message =
      (data && typeof data === 'object' && 'message' in data
        ? (data as { message?: string }).message
        : null) || '요청 처리에 실패했습니다.';

    throw new ApiError(message, response.status, data);
  }

  return data as T;
};

