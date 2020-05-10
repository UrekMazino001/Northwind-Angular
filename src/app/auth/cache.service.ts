import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class  CacheService {

  //Metodo para obtener un dato en fomato JSON desde localStorage
  protected getItemStoraged<T>(key: string): T{
    const data = localStorage.getItem(key);
    if(data && data !== 'undefined'){
      return JSON.parse(data);                    //Convierte string a JSON
    }
    return null;
  }

  protected setItemStoraged(key: string, data: object | string){
    if(typeof data === 'string'){
      localStorage.setItem(key, data);
    }
    localStorage.setItem(key, JSON.stringify(data)) //Cobvierte JSON a string
  }

  protected removeItemStoraged(key: string){
    localStorage.removeItem(key);
  }
  protected clear(){
    localStorage.clear();
  }
}
