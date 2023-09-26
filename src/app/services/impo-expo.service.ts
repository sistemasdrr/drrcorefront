import { Injectable } from '@angular/core';
import { ImpoExpoData } from '@shared/components/cuadro-impo-expo/cuadro-impo-expo.component';

let ImpoData : ImpoExpoData[] = [
  {
    id : "1",
    anio : "2020",
    monto : "647,822,356"
  },
  {
    id : "2",
    anio : "2021",
    monto : "694,345,965"
  },
  {
    id : "3",
    anio : "2022",
    monto : "574,325,645"
  },
]

let ExpoData : ImpoExpoData[] = [
  {
    id : "1",
    anio : "2020",
    monto : "934,321"
  },
  {
    id : "2",
    anio : "2021",
    monto : "923,122"
  },
  {
    id : "3",
    anio : "2022",
    monto : "923,911"
  },
]
@Injectable({
  providedIn: 'root'
})
export class ImpoExpoService {

  constructor() { }

  getImpoData(){
    return ImpoData;
  }
  getExpoData(){
    return ExpoData;
  }

  setImpoData(impoData : ImpoExpoData[]){
    ImpoData = impoData;
  }
  setExpoData(expoData : ImpoExpoData[]){
    ExpoData = expoData;
  }
}
