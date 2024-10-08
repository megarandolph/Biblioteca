import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private route: Router
  ) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; // Retorna true si hay un token, false si no
  }
  
  // Simula obtener el token desde el localStorage o sessionStorage
  getToken(): string | null {
    return localStorage.getItem('authToken'); // Aquí es donde almacenas tu token
  }

  // Método para guardar el token en localStorage o sessionStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Método para eliminar el token (logout)
  removeToken(): void {
    localStorage.removeItem('authToken');
    this.route.navigate(['/']);

  }
}
