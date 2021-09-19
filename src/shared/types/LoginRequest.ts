type DeviceInfo = {
  type: 'MOBILE_APP' | 'MOBILE_BROWSER' | 'DESKTOP';
  appDetails: string;
  deviceDetails: string;
  ipAddress: string;
};

export type LoginRequest = {
  username: string;
  password: string;
  rememberMe: boolean;
  deviceInfo: DeviceInfo;
};
