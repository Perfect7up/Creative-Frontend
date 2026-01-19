import { authApi } from '~/api/api-services';
import { useAuthStore } from '~/modules/account/store/auth-store';
import { queryClient } from '~/api/query-client-setup';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  LogoutRequest,
  RefreshTokenRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '~/modules/account/types/auth.schema';
import { getErrorMessage } from '~/core/utils/error-utils';

export const useAuth = () => {
  const { accessToken, refreshToken, setTokens, clearAuth } = useAuthStore();
  const service = authApi.auth;

  const loginMutation = service.creativeAuthApiEndpointsAuthLoginLogin.useMutation(undefined, {
    onSuccess: (data: any) => {
      console.log('Raw API response:', data);
      const accessToken = data.Token || data.token;
      const refreshToken = data.RefreshToken || data.refreshToken;

      if (accessToken && refreshToken) {
        console.log('Setting tokens:', { accessToken, refreshToken });
        setTokens(accessToken, refreshToken);
      } else {
        console.error('Tokens missing:', data);
      }
    },
  });

  const registerMutation = service.creativeAuthApiEndpointsAuthRegisterRegister.useMutation();

  const logoutMutation = service.creativeAuthApiEndpointsAuthLogoutLogout.useMutation();

  const refreshMutation = service.creativeAuthApiEndpointsAuthRefreshTokenRefreshToken.useMutation(
    undefined,
    {
      onSuccess: (data: AuthResponse) => {
        if (data.Token && data.RefreshToken) {
          setTokens(data.Token, data.RefreshToken);
        }
      },
    },
  );

  const forgotPasswordMutation =
    service.creativeAuthApiEndpointsAuthForgotPasswordForgotPassword.useMutation();

  const resetPasswordMutation =
    service.creativeAuthApiEndpointsAuthResetPasswordResetPassword.useMutation();

  const useVerifyEmailQuery = (token: string | null) =>
    service.creativeAuthApiEndpointsAuthVerifyEmailVerifyEmail.useQuery(
      { query: { Token: token ?? '' } },
      {
        enabled: !!token,
        retry: false,
      },
    );

  const login = (
    variables: { body: LoginRequest },
    options?: Parameters<typeof loginMutation.mutate>[1],
  ) => loginMutation.mutate(variables, options);

  const register = (
    variables: { body: RegisterRequest },
    options?: Parameters<typeof registerMutation.mutate>[1],
  ) => registerMutation.mutate(variables, options);

  const forgotPassword = (
    variables: { body: ForgotPasswordRequest },
    options?: Parameters<typeof forgotPasswordMutation.mutate>[1],
  ) => forgotPasswordMutation.mutate(variables, options);

  const resetPassword = (
    variables: { body: ResetPasswordRequest },
    options?: Parameters<typeof resetPasswordMutation.mutate>[1],
  ) => resetPasswordMutation.mutate(variables, options);

  const refresh = (options?: Parameters<typeof refreshMutation.mutate>[1]) => {
    if (accessToken) {
      const payload: RefreshTokenRequest = { Token: accessToken };
      refreshMutation.mutate({ body: payload }, options);
    }
  };

  const logout = (options?: {
    onSuccess?: (data: unknown) => void;
    onError?: (error: unknown) => void;
  }) => {
    const doClientLogout = () => {
      clearAuth();
      queryClient.clear();
    };

    if (!refreshToken) {
      doClientLogout();
      options?.onSuccess?.(null);
      return;
    }

    const payload: LogoutRequest = { RefreshToken: refreshToken };

    logoutMutation.mutate(
      { body: payload },
      {
        onSettled: () => {
          doClientLogout();
          options?.onSuccess?.(null);
        },

        onError: (err) => {
          doClientLogout();
          options?.onError?.(err);
        },
      },
    );
  };

  return {
    isAuthenticated: !!accessToken,
    accessToken,
    refreshToken,
    login,
    register,
    logout,
    refresh,
    forgotPassword,
    resetPassword,
    useVerifyEmailQuery,
    apiErrorMessages: {
      login: getErrorMessage(loginMutation.error),
      register: getErrorMessage(registerMutation.error),
      forgot: getErrorMessage(forgotPasswordMutation.error),
      reset: getErrorMessage(resetPasswordMutation.error),
    },
    status: {
      isLoggingIn: loginMutation.isPending,
      isRegistering: registerMutation.isPending,
      isLoggingOut: logoutMutation.isPending,
      isRefreshing: refreshMutation.isPending,
      isSendingForgot: forgotPasswordMutation.isPending,
      isResetting: resetPasswordMutation.isPending,
    },
    errors: {
      login: loginMutation.error,
      register: registerMutation.error,
      forgot: forgotPasswordMutation.error,
      reset: resetPasswordMutation.error,
      refresh: refreshMutation.error,
    },
  };
};
