import axios, {AxiosResponse} from 'axios';
import {
  QR_LOGIN,
  getOnQrScan,
  USERNAME_PASSWORD_LOGIN,
  REGISTER_QR_LOGIN_REQUEST,
} from '../shared/utils/UrlConstants';
import {QrLoginRequest, QrCodeScanEvent, LoginRequest} from '../shared/types';

class AuthenticationService {
  performUsernamePasswordLogin(
    loginRequest: LoginRequest,
    successfulCallback: () => void,
    errorCallback: () => void,
  ) {
    axios
      .post(USERNAME_PASSWORD_LOGIN, loginRequest, {withCredentials: true})
      .then(() => successfulCallback())
      .catch(() => errorCallback());
  }

  scanQrCode(
    qrCodeLoginRequest: QrLoginRequest,
    browserId: string,
    qrCodeScanEvent: QrCodeScanEvent,
    successCallback: () => void,
  ) {
    const registerQrRequest = axios.post(
      REGISTER_QR_LOGIN_REQUEST,
      qrCodeLoginRequest,
      {
        withCredentials: true,
      },
    );

    const sendOnQrScanEvent = axios.post(
      getOnQrScan(browserId),
      qrCodeScanEvent,
      {
        withCredentials: true,
      },
    );

    const promises: Array<Promise<AxiosResponse<void>>> = [
      registerQrRequest,
      sendOnQrScanEvent,
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
    axios
      .post(QR_LOGIN, {}, {withCredentials: true})
      .then(() => successfulCallback())
      .catch(() => errorCallback());
  }
}

export default new AuthenticationService();
