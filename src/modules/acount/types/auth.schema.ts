import type { components } from '../../../api/services/auth/schema';

type Schemas = components['schemas'];

// 1. Login & Refresh
export type LoginRequest = Schemas['CreativeAuthApplicationFeaturesLoginLoginRequest'];
export type AuthResponse = Schemas['CreativeAuthApplicationFeaturesLoginAuthResponse'];
export type RefreshTokenRequest =
  Schemas['CreativeAuthApiEndpointsAuthRefreshTokenRefreshTokenRequest'];

// 2. Registration
export type RegisterRequest = Schemas['CreativeAuthApplicationFeaturesRegisterRegisterRequest'];

// 3. Password Management
export type ForgotPasswordRequest =
  Schemas['CreativeAuthApiEndpointsAuthForgotPasswordForgotPasswordRequest'];
export type ForgotPasswordResponse =
  Schemas['CreativeAuthApiEndpointsAuthForgotPasswordForgotPasswordResponse'];
export type ResetPasswordRequest =
  Schemas['CreativeAuthApiEndpointsAuthResetPasswordResetPasswordRequest'];

// 4. Logout & Verification
export type LogoutRequest = Schemas['CreativeAuthApiEndpointsAuthLogoutLogoutRequest'];
