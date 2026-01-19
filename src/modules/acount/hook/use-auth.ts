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

  // --- 1. LOGIN ---
  const loginMutation = service.creativeAuthApiEndpointsAuthLoginLogin.useMutation(undefined, {
    onSuccess: (data: AuthResponse) => {
      if (data.Token && data.RefreshToken) {
        setTokens(data.Token, data.RefreshToken);
      }
    },
  });

  // --- 2. REGISTER ---
  const registerMutation = service.creativeAuthApiEndpointsAuthRegisterRegister.useMutation();

  // --- 3. LOGOUT ---
  const logoutMutation = service.creativeAuthApiEndpointsAuthLogoutLogout.useMutation(undefined, {
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
    },
  });

  // --- 4. REFRESH TOKEN ---
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

  // --- 5. FORGOT PASSWORD ---
  const forgotPasswordMutation =
    service.creativeAuthApiEndpointsAuthForgotPasswordForgotPassword.useMutation();

  // --- 6. RESET PASSWORD ---
  const resetPasswordMutation =
    service.creativeAuthApiEndpointsAuthResetPasswordResetPassword.useMutation();

  // --- 7. VERIFY EMAIL ---
  const verifyEmailQuery = service.creativeAuthApiEndpointsAuthVerifyEmailVerifyEmail.useQuery(
    undefined,
    { enabled: false },
  );

  // --- ACTIONS ---

  const login = (body: LoginRequest) => loginMutation.mutate({ body });

  const register = (body: RegisterRequest) => registerMutation.mutate({ body });

  const logout = () => {
    if (refreshToken) {
      const payload: LogoutRequest = { RefreshToken: refreshToken };
      logoutMutation.mutate({ body: payload });
    } else {
      clearAuth();
      queryClient.clear();
    }
  };

  const refresh = () => {
    if (accessToken) {
      const payload: RefreshTokenRequest = { Token: accessToken };
      refreshMutation.mutate({ body: payload });
    }
  };

  const forgotPassword = (body: ForgotPasswordRequest) => forgotPasswordMutation.mutate({ body });

  const resetPassword = (body: ResetPasswordRequest) => resetPasswordMutation.mutate({ body });

  const verifyEmail = () => verifyEmailQuery.refetch();

  return {
    isAuthenticated: !!accessToken,
    accessToken,
    login,
    register,
    logout,
    refresh,
    forgotPassword,
    resetPassword,
    verifyEmail,
    status: {
      isLoggingIn: loginMutation.isPending,
      isRegistering: registerMutation.isPending,
      isLoggingOut: logoutMutation.isPending,
      isRefreshing: refreshMutation.isPending,
      isSendingForgot: forgotPasswordMutation.isPending,
      isResetting: resetPasswordMutation.isPending,
      isVerifying: verifyEmailQuery.isFetching,
    },
    errors: {
      login: loginMutation.error,
      register: registerMutation.error,
      forgot: forgotPasswordMutation.error,
      reset: resetPasswordMutation.error,
    },
  };
};
