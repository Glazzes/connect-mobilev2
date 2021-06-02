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
    const promises: Promise<void>[] = [
      axios.post(`${HOST}:${PORT}${QR_REGISTER}`, qrCodeLoginRequest, {
        withCredentials: true,
      }),
      axios.post(
        `${HOST}:${PORT}${SSE}${browserId}${QR_SCAN}`,
        qrCodeScanEvent,
        {withCredentials: true},
      ),
    ];

    Promise.all(promises)
      .then(() => successCallback())
      .catch(() => console.log('not ok'));
  }

  sendQrLoginSSE(
    browserId: string,
    successfulCallback: () => void,
    errorCallback: () => void,
  ) {
    const qrLogin = `${HOST}:${PORT}${SSE}${browserId}${QR_LOGIN}`;

    axios
      .post(qrLogin, {}, {withCredentials: true})
      .then(() => successfulCallback())
      .catch(() => errorCallback());
  }
}

export default new AuthenticationService();
