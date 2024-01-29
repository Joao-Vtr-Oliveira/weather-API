export type weatherReturnType = {
  location : {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    is_day: 0 | 1;
    condition: {
      text: string;
      icon: string;
    }
    wind_kph: number;
    humidity: number;
  }
}