import { DeviceInfo } from "../../../shared/types/DeviceInfo";

export type UsernamePasswordLoginRequest = {
  username: string;
  password: string;
  rememberMe: boolean;
  deviceInfo: DeviceInfo;
}