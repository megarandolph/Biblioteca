import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment';
import { Autor } from '../models/autor.model';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

    private readonly api = environment.api;
    
    constructor(
        private http: HttpClient        
      ) { }

    getAutor(type: number = 0, AutorId: number = 0){        
        return this.http.get<any>(`${this.api}/Autor?type=${type}&AutorId=${AutorId}`)
    }  
    
    postAutor(Autor: Autor){
        return this.http.post<any>(`${this.api}/Autor`, Autor)

    }
    
    putAutor(Autor: Autor){
        return this.http.put<any>(`${this.api}/Autor`, Autor)
    }
    
    deleteAutor(AutorId: number){
        return this.http.delete<any>(`${this.api}/Autor?AutorId=${AutorId}`)
    }
}