import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment';
import { Login } from '../models/login.model';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

    private readonly api = environment.api;
    
    constructor(
        private http: HttpClient        
      ) { }
      
    postLogin(Login: Login){
        return this.http.post<any>(`${this.api}/Login`, Login)

    }
}