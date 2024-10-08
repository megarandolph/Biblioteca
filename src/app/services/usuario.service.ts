import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment';
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    private readonly api = environment.api;
    
    constructor(
        private http: HttpClient        
      ) { }

    getUsuario(type: number = 0, UsuarioId: number = 0){        
        return this.http.get<any>(`${this.api}/Usuario?type=${type}&UsuarioId=${UsuarioId}`)
    }  
    
    postUsuario(Usuario: Usuario){
        return this.http.post<any>(`${this.api}/Usuario`, Usuario)

    }
    
    putUsuario(Usuario: Usuario){
        return this.http.put<any>(`${this.api}/Usuario`, Usuario)
    }
    
    deleteUsuario(UsuarioId: number){
        return this.http.delete<any>(`${this.api}/Usuario?UsuarioId=${UsuarioId}`)
    }
}