type AndroidVersion = {
  name: string;
  version: number;
};

/*
Versions previos to 5.0 Lollipop are discarted because minSdkVersion is set to 21
*/
export function getOsInfoByApiLevelAndroid(apiLevel: number): AndroidVersion {
  switch (apiLevel) {
    case 21:
      return {name: 'Lollipop', version: 5.0};

    case 22:
      return {name: 'Lollipop', version: 5.1};

    case 23:
      return {name: 'MarshMallow', version: 6.0};

    case 24:
      return {name: 'Nougat', version: 7.0};

    case 25:
      return {name: 'Nougat', version: 7.1};

    case 26:
      return {name: 'Oreo', version: 8.0};

    case 27:
      return {name: 'Oreo', version: 8.1};

    case 28:
      return {name: 'Pie', version: 9.0};

    case 29:
      return {name: 'Q', version: 10.0};

    case 30:
      return {name: 'R', version: 11.0};

    case 31:
      return {name: 'S', version: 12.0};

    default:
      return {name: 'N/A', version: -1};
  }
}
