import { authApi } from '~/api/api-services';
import { useAuthStore } from '~/modules/acount/store/auth-store';
import { queryClient } from '~/api/query-client-setup';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  LogoutRequest,
  RefreshTokenRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '~/modules/acount/types/auth.schema';

export const useAuth = () => {
  const { accessToken, refreshToken, setTokens, clearAuth } = useAuthStore();
  const service = authApi.auth;

  const loginMutation = service.creativeAuthApiEndpointsAuthLoginLogin.useMutation(undefined, {
    onSuccess: (data: AuthResponse) => {
      if (data.Token && data.RefreshToken) {
        setTokens(data.Token, data.RefreshToken);
      }
    },
  });

  const registerMutation = service.creativeAuthApiEndpointsAuthRegisterRegister.useMutation();

  const logoutMutation = service.creativeAuthApiEndpointsAuthLogoutLogout.useMutation(undefined, {
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
    },
  });

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

  const logout = (options?: Parameters<typeof logoutMutation.mutate>[1]) => {
    if (refreshToken) {
      const payload: LogoutRequest = { RefreshToken: refreshToken };
      logoutMutation.mutate({ body: payload }, options);
    } else {
      clearAuth();
      queryClient.clear();
    }
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
