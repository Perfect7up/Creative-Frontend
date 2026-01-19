import type { components } from '~/api/services/auth/schema';

type Schemas = components['schemas'];

// 1. Login & Refresh
export type LoginRequest = Schemas['CreativeAuthApplicationFeaturesLoginLoginRequest'];
export type AuthResponse = Schemas['CreativeAuthApplicationFeaturesLoginAuthResponse'];
export type RefreshTokenRequest =
  Schemas['CreativeAuthApiEndpointsAuthRefreshTokenRefreshTokenRequest'];

export type RegisterRequest = Schemas['CreativeAuthApiEndpointsAuthRegisterRegisterRequest'];
export type RegisterResponse = Schemas['CreativeAuthApiEndpointsAuthRegisterRegisterResponse'];

export type ForgotPasswordRequest =
  Schemas['CreativeAuthApiEndpointsAuthForgotPasswordForgotPasswordRequest'];
export type ForgotPasswordResponse =
  Schemas['CreativeAuthApiEndpointsAuthForgotPasswordForgotPasswordResponse'];
export type ResetPasswordRequest =
  Schemas['CreativeAuthApiEndpointsAuthResetPasswordResetPasswordRequest'];

export type LogoutRequest = Schemas['CreativeAuthApiEndpointsAuthLogoutLogoutRequest'];
