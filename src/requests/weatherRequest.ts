import axios from 'axios';
import { weatherReturnType } from '../types/weatherReturn';
const apiKey = 'd452d085830447d2816142629242901';

export const weatherRequest = async (location: string):Promise<weatherReturnType> => {
  try {
    const locationData = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no&lang=en`);
    if (locationData.status !== 200) {
      throw new Error(`Erro na solicitação: ${locationData.status} - ${locationData.statusText}`);
    }
    return locationData.data;
  } catch(error: any) {
    throw new Error(error);
  }
}