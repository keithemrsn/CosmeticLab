const normalizeBaseUrl = (value: string | undefined): string => {
  if (!value) return "";
  return value.endsWith("/") ? value.slice(0, -1) : value;
};

export const runtimeConfig = {
  appEnv: import.meta.env.MODE,
  apiBaseUrl: normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL),
  shopifyStorefrontApiUrl: normalizeBaseUrl(import.meta.env.VITE_SHOPIFY_STOREFRONT_API_URL),
  shopifyStorefrontToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN ?? "",
  enableMockAuth: import.meta.env.VITE_ENABLE_MOCK_AUTH !== "false",
  requestTimeoutMs: Number(import.meta.env.VITE_REQUEST_TIMEOUT_MS ?? 10000),
};

export const hasBackendApi = runtimeConfig.apiBaseUrl.length > 0;
export const hasShopifyStorefront =
  runtimeConfig.shopifyStorefrontApiUrl.length > 0 && runtimeConfig.shopifyStorefrontToken.length > 0;
