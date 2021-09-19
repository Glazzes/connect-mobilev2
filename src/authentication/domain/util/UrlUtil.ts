import {BASE_URL} from '../../../shared/utils/UrlConstants';

export const USERNAME_PASSWORD_LOGIN = `${BASE_URL}/auth/login`;
export const REGISTER_QR_LOGIN_REQUEST = `${BASE_URL}/auth/qr/register`;

export function getSSEOnQrScanUrl(id: string): string {
  return `${BASE_URL}/auth/sse/${id}/qr-scan`;
}

export function getSSEOnQrLoginUrl(id: string): string {
  return `${BASE_URL}/auth/sse/${id}/qr-login`;
}

export function getSSEOnQrCancelUrl(id: string): string {
  return `${BASE_URL}/auth/sse/${id}/qr-cancel`;
}
