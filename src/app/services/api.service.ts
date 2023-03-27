import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  addDoctor(data :any){
    return this.http.post<any>("http://127.0.0.1:8000/api/doctor",data);
  }
  getAll(){
    return this.http.get<any>("http://127.0.0.1:8000/api/allDoctor")
  }
  UpdateDotor(data : any, id :number ){

    return this.http.put("http://127.0.0.1:8000/api/updateDoctor/"+id,data)

  }
  deleteDotor(id : number){
    return this.http.delete<any>("http://127.0.0.1:8000/api/deleteDoctor/"+id)
  }
}
