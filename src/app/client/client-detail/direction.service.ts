import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Direction } from '../model/directions';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {

  constructor(private http : HttpClient) { }

  getDirectionsByClientId(id:number){
    return this.http.get<any>("https://localhost:7113/api/Directions/DirecctionsByClientId/"+id)
  }
  getDirectionId(id :number) {
    return this.http.get<any>("https://localhost:7113/api/Directions/"+id)
  }
  postNewDirections(data : Direction){
    return this.http.post<any>("https://localhost:7113/api/Directions/",data)
  }
  updateDirection(data : Direction, id :number){
    return this.http.put<any>("https://localhost:7113/api/Directions/"+id,data)
  }
  deleteDirection(id :number){
    return this.http.delete<any>("https://localhost:7113/api/Directions/"+id)
  }

}
