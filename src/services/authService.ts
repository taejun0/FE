import { ApiError, apiFetch } from './apiClient';

export interface SignupPayload {
  nickname: string;
  password: string;
  passwordCheck: string;
}

export interface SignupResponse {
  message: string;
  user: {
    id: number;
    nickname: string;
  };
}

export interface LoginPayload {
  nickname: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    nickname: string;
  };
}

export const signup = async (
  payload: SignupPayload
): Promise<SignupResponse> => {
  try {
    return await apiFetch<SignupResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('회원가입에 실패했습니다. 다시 시도해 주세요.', 0, null);
  }
};

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    return await apiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('로그인에 실패했습니다. 다시 시도해 주세요.', 0, null);
  }
};

const ACCESS_TOKEN_KEY = 'qroom_access_token';
const REFRESH_TOKEN_KEY = 'qroom_refresh_token';
const USER_KEY = 'qroom_user';

export const persistAuth = (loginResult: LoginResponse) => {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, loginResult.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, loginResult.refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(loginResult.user));
  } catch {
    // localStorage 사용 실패 시 조용히 무시
  }
};

export const clearAuth = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getAccessToken = (): string | null => {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const getRefreshToken = (): string | null => {
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setAccessToken = (token: string) => {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch {
    // localStorage 사용 실패 시 조용히 무시
  }
};

export interface RefreshTokenResponse {
  message: string;
  accessToken: string;
}

export const refreshAccessToken = async (
  refreshToken: string
): Promise<RefreshTokenResponse> => {
  try {
    const baseUrl = import.meta.env.VITE_BASE_URL ?? '';
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    if (!cleanBaseUrl) {
      throw new ApiError('서버 주소가 설정되지 않았습니다.', 0, null);
    }

    const response = await fetch(`${cleanBaseUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        (data && typeof data === 'object' && 'message' in data
          ? (data as { message?: string }).message
          : null) || '토큰 재발급에 실패했습니다. 다시 로그인해 주세요.';
      throw new ApiError(message, response.status, data);
    }

    return data as RefreshTokenResponse;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      '토큰 재발급에 실패했습니다. 다시 로그인해 주세요.',
      0,
      null
    );
  }
};
