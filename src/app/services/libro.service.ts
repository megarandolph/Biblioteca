import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment';
import { Libro } from '../models/libro.model';


@Injectable({
  providedIn: 'root'
})
export class LibroService {

    private readonly api = environment.api;
    
    constructor(
        private http: HttpClient        
      ) { }

    getLibro(type: number = 0, LibroId: number = 0){        
        return this.http.get<any>(`${this.api}/Libro?type=${type}&LibroId=${LibroId}`)
    }  
    
    postLibro(Libro: Libro){
        return this.http.post<any>(`${this.api}/Libro`, Libro)

    }
    
    putLibro(Libro: Libro){
        return this.http.put<any>(`${this.api}/Libro`, Libro)
    }
    
    deleteLibro(LibroId: number){
        return this.http.delete<any>(`${this.api}/Libro?LibroId=${LibroId}`)
    }
}