import {
  PORT,
  SSE,
  QR_SCAN,
  QR_LOGIN,
  QR_CANCEL,
  QR_REGISTER,
  LOGIN_ENDPOINT,
} from '@env';
import axios from 'axios';
import {QrLoginRequest} from '../types/QrLoginRequest';
import {QrCodeScanEvent} from '../types/QrCodeScanEvent';
import {LoginRequest} from '../types/LoginRequest';

const HOST = 'http://192.168.42.210';

class AuthenticationService {
  performUsernamePasswordLogin(
    loginRequest: LoginRequest,
    successfulCallback: () => void,
    errorCallback: () => void,
  ) {
    const loginUrl = `${HOST}:${PORT}${LOGIN_ENDPOINT}`;
    axios
      .post(loginUrl, loginRequest, {withCredentials: true})
      .then(() => successfulCallback())
      .catch(() => errorCallback());
  }

  scanQrCode(
    qrCodeLoginRequest: QrLoginRequest,
    browserId: string,
    qrCodeScanEvent: QrCodeScanEvent,
    successCallback: () => void,
  ) {
    console.log(qrCodeLoginRequest);
    const promises: Promise<void>[] = [
      this.registerQrLoginRequest(qrCodeLoginRequest),
      this.sendQrScanSSE(browserId, qrCodeScanEvent),
    ];

    Promise.all(promises)
      .then(() => successCallback())
      .catch(() => console.log('not ok'));
  }

  private registerQrLoginRequest(
    qrLoginRequest: QrLoginRequest,
  ): Promise<void> {
    const url = `${HOST}:${PORT}${QR_REGISTER}`;
    console.log(url);
    return axios.post(url, qrLoginRequest, {withCredentials: true});
  }

  private sendQrScanSSE(
    browserId: string,
    qrCodeScanEvent: QrCodeScanEvent,
  ): Promise<void> {
    const qrScanUrl = `${HOST}:${PORT}${SSE}${browserId}${QR_SCAN}`;
    console.log(qrScanUrl);
    return axios.post(qrScanUrl, qrCodeScanEvent, {withCredentials: true});
  }

  sendQrLoginSSE(
    browserId: string,
    successfulCallback: () => void,
    errorCallback: () => void,
  ) {
    const qrLogin = `${HOST}:${PORT}${SSE}${browserId}${QR_LOGIN}`;
    console.log(qrLogin);
    axios
      .post(qrLogin, {}, {withCredentials: true})
      .then(() => successfulCallback())
      .catch(() => errorCallback());
  }
}

export default new AuthenticationService();
