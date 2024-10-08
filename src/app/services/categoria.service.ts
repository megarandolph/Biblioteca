import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment';
import { Categoria } from '../models/categoria.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

    private readonly api = environment.api;
    
    constructor(
        private http: HttpClient        
      ) { }

    getCategoria(type: number = 0, CategoriaId: number = 0){        
        return this.http.get<any>(`${this.api}/Categoria?type=${type}&CategoriaId=${CategoriaId}`)
    }  
    
    postCategoria(Categoria: Categoria){
        return this.http.post<any>(`${this.api}/Categoria`, Categoria)

    }
    
    putCategoria(Categoria: Categoria){
        return this.http.put<any>(`${this.api}/Categoria`, Categoria)
    }
    
    deleteCategoria(CategoriaId: number){
        return this.http.delete<any>(`${this.api}/Categoria?CategoriaId=${CategoriaId}`)
    }
}