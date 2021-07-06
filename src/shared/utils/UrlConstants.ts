// backend defaults
const HOST = 'http://192.168.42.210';
const PORT = '8080';
const BASE_URL = `${HOST}:${PORT}`;

// real time endpoints
export const WS_ENDPOINT = `${BASE_URL}/ws`;
export function getSSEEmitter(id: string): string {
  return `${BASE_URL}/auth/sse/${id}/listen`;
}

export function getOnQrScan(id: string): string {
  return `${BASE_URL}/auth/sse/${id}/qr-scan`;
}

// authentication endpoints
export const USERNAME_PASSWORD_LOGIN = `${BASE_URL}/auth/login`;
export const QR_LOGIN = `${BASE_URL}/auth/qr/login`;
export const REGISTER_QR_LOGIN_REQUEST = `${BASE_URL}/auth/qr/register`;
