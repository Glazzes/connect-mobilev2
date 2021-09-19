import axios from "axios";
import {REGISTER_QR_LOGIN_REQUEST, getSSEOnQrScanUrl, getSSEOnQrLoginUrl, getSSEOnQrCancelUrl} from '../domain/util/UrlUtil';
import { QrLoginRequest, QrScanEvent } from "../domain/types";

class SSEAuthService{
  
  public sendOnQrCodeScannedEvent(
    browserId: string, 
    qrLoginRequest: QrLoginRequest,
    qrScannedEvent: QrScanEvent  
  ): Promise<void[]>{
    const promises = [
      this.registerQrLoginRequest(qrLoginRequest),
      this.sendQrScannedEvent(browserId, qrScannedEvent)
    ];

    return Promise.all(promises);
  }  

  private registerQrLoginRequest(qrLonginRequest: QrLoginRequest): Promise<void>{
    return axios.post(REGISTER_QR_LOGIN_REQUEST, qrLonginRequest, {withCredentials: true});
  }

  private sendQrScannedEvent(browserId: string, qrScannedEvent: QrScanEvent): Promise<void>{
    const url = getSSEOnQrScanUrl(browserId);
    return axios.post(url, qrScannedEvent, {withCredentials: true});
  }

  public sendQrLoginEvent(browserId: string){
    const url = getSSEOnQrLoginUrl(browserId);
    return axios.post(url, {}, {withCredentials: true});
  }

  public sendQrCancelEvent(browserId: string){
    const url = getSSEOnQrCancelUrl(browserId);
    return axios.post(url, {}, {withCredentials: true});
  }

}

export default new SSEAuthService();