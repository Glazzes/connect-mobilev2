type DeviceInfo = {
  type: string;
  deviceName: string;
  deviceVersion: string;
  deviceOperatingSystem: string;
};

export type LoginRequest = {
  username: string;
  password: string;
  deviceInfo: DeviceInfo;
};