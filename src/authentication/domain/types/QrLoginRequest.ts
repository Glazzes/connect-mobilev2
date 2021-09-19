import { DeviceInfo } from "../../../shared/types/DeviceInfo";

export type QrLoginRequest = {
  issuedFor: string;
  mobileId: string;
  browserId: string;
  deviceInfo: DeviceInfo;
};