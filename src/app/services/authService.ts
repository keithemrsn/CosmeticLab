import { hasBackendApi, runtimeConfig } from "../lib/runtime";
import { httpRequest } from "../lib/http";

export interface AuthUser {
  id: number;
  email: string;
  name: string;
}

interface AuthResponse {
  user: AuthUser;
}

const toMockUser = (email: string, name?: string): AuthUser => ({
  id: Date.now(),
  email,
  name: name ?? email.split("@")[0],
});

export async function loginWithEmail(email: string, _password: string): Promise<AuthUser> {
  if (hasBackendApi && !runtimeConfig.enableMockAuth) {
    const data = await httpRequest<AuthResponse>(`${runtimeConfig.apiBaseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: _password }),
    });

    return data.user;
  }

  await new Promise((resolve) => window.setTimeout(resolve, 400));
  return toMockUser(email);
}

export async function signupWithEmail(email: string, _password: string, name: string): Promise<AuthUser> {
  if (hasBackendApi && !runtimeConfig.enableMockAuth) {
    const data = await httpRequest<AuthResponse>(`${runtimeConfig.apiBaseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: _password, name }),
    });

    return data.user;
  }

  await new Promise((resolve) => window.setTimeout(resolve, 400));
  return toMockUser(email, name);
}

export async function logoutSession(): Promise<void> {
  if (hasBackendApi && !runtimeConfig.enableMockAuth) {
    await httpRequest<void>(`${runtimeConfig.apiBaseUrl}/auth/logout`, {
      method: "POST",
    });
  }
}
