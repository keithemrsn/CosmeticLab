import { runtimeConfig } from "./runtime";

export class HttpError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

const getCookieValue = (cookieName: string): string | undefined => {
  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${cookieName}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1]) : undefined;
};

export async function httpRequest<TResponse>(
  url: string,
  options: RequestInit = {},
): Promise<TResponse> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), runtimeConfig.requestTimeoutMs);
  const method = options.method?.toUpperCase() ?? "GET";

  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  headers.set("X-Requested-With", "XMLHttpRequest");

  const csrfToken = getCookieValue("csrf_token");
  if (csrfToken && method !== "GET") {
    headers.set("X-CSRF-Token", csrfToken);
  }

  const response = await fetch(url, {
    ...options,
    method,
    credentials: "include",
    mode: "cors",
    headers,
    signal: controller.signal,
  }).finally(() => {
    window.clearTimeout(timeout);
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await response.json().catch(() => undefined)
    : await response.text().catch(() => undefined);

  if (!response.ok) {
    const fallbackMessage = typeof payload === "object" && payload && "message" in payload
      ? String((payload as { message?: unknown }).message)
      : `Request failed with status ${response.status}`;

    throw new HttpError(fallbackMessage, response.status, payload);
  }

  return payload as TResponse;
}
