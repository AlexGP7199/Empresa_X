import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient) {
      
   }

   getAllClients(){
    return this.http.get<any>("https://localhost:7113/api/Client/")
  }
  getClientById(id:number){
    return this.http.get<any>("https://localhost:7113/api/Client/"+id)
  }

  postNewClient(data : Client){
      return this.http.post<any>("https://localhost:7113/api/Client/", data)
  }

  updateClient(data : Client, id : number){
    return this.http.put<any>("https://localhost:7113/api/Client/"+id, data)
  }

  DeleteClientByIDClient(id : number){
    return this.http.delete<any>("https://localhost:7113/api/Client/DeleteClientByIDClient/"+id)
  }

}
