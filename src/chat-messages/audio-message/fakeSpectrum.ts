import { Dimensions } from "react-native"

const {width} = Dimensions.get('window');
const NUMBER_LINES = 55;

export const MAX_LINE_HEIGHT = 100;
export const LINE_WIDTH = width * 0.6 / NUMBER_LINES;

export function getFakeSpectrum(): Array<number> {
  const spectrum = []; 
  for(let i = 0; i < NUMBER_LINES; i++){
    spectrum.push(Math.max(15, Math.random() * 100));
  }

  return spectrum;
}