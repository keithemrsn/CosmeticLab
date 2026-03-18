import { hasBackendApi, hasShopifyStorefront, runtimeConfig } from "../lib/runtime";
import { httpRequest } from "../lib/http";
import type { CartItem } from "../context/CartContext";

export interface CheckoutAddress {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface CheckoutSessionRequest {
  cartItems: CartItem[];
  shippingAddress: CheckoutAddress;
}

interface CheckoutSessionResponse {
  checkoutUrl?: string;
}

export async function createCheckoutSession(payload: CheckoutSessionRequest): Promise<CheckoutSessionResponse> {
  if (hasBackendApi) {
    return httpRequest<CheckoutSessionResponse>(`${runtimeConfig.apiBaseUrl}/checkout/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }

  if (hasShopifyStorefront) {
    return {
      checkoutUrl: "",
    };
  }

  await new Promise((resolve) => window.setTimeout(resolve, 1000));
  return {};
}
