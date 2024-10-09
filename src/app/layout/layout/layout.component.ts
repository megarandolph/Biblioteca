import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { Login } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,  
    ReactiveFormsModule  
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{

  isSidebarHidden = false;
  isDropdownOpen = false;
  isLogin = false;
  loginForm: FormGroup;
  email:any = localStorage.getItem('email');
  rolId:any = localStorage.getItem('rolId');
  sidebarItems: any[] = []
  sidebarItemsOriginal = [
    { title: 'Biblioteca', link: '/', icon: '📚', rolId: 0 },  
    { title: 'Categorias', link: '/pages/categoria', icon: '📚', rolId: 2 },  
    { title: 'Usuarios', link: '/pages/usuario', icon: '👥', rolId: 2 },      
    { title: 'Autores', link: '/pages/autor', icon: '✍️', rolId: 1 },     
    { title: 'Libros', link: '/pages/libro', icon: '📖', rolId: 1 }           
    
  ];

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = window.innerWidth;
    // Oculta el sidebar si la pantalla es menor que 1024px (lg)
    if (width < 1024) {
      this.isSidebarHidden = true;
    } else {
      this.isSidebarHidden = false;
    }
  }


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email]],
    });

    this.refreshSidebarItems();
  }

  ngOnInit(): void {
    this.isLogin = this.authService.isLoggedIn()    
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.loginForm.get('email')?.setValue('');
  }

  refreshSidebarItems(){
    this.email = localStorage.getItem('email');
    this.rolId = localStorage.getItem('rolId');
    
    this.sidebarItems = this.sidebarItemsOriginal.filter(item =>        
      item.rolId === (Number(this.rolId)) || item.rolId === 0 
    );
  }

  onMenuClick() {
    if (window.innerWidth < 1024) {
      this.isSidebarHidden = true;
    }
  }

  Logout(){
    this.authService.removeToken();
    this.isLogin = false;
    localStorage.removeItem('email');
    localStorage.removeItem('rolId');    
    this.refreshSidebarItems();
  }

  submitLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value as Login;
      this.loginService.postLogin(email).subscribe({
        next: (res:any) => {
          this.authService.setToken(res.token);          
          localStorage.setItem('email', res.usuario?.email);
          localStorage.setItem('rolId', res.usuario?.rolId);       
          this.router.navigate(['/']);
            Swal.fire({
              icon: 'success',
              title: 'Acceso correcto',
              text: 'Se inicio sesion se realizó con éxito',
              showConfirmButton: false,
              timer: 2000
            });    
          this.isLogin = true;      
          this.toggleDropdown();
          this.refreshSidebarItems();

        }, error: (error: any) => {
          if (error.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Acceso denegado',
              text: 'Credenciales incorrectas. Verifica tu usuario o contraseña.',
              showConfirmButton: false,
              timer: 2000
            })            
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ha ocurrido un error inesperado',
              showConfirmButton: false,
              timer: 2000
            })
            
          }          
        }
      })
    }
  }
}
