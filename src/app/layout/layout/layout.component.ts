import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  isSidebarHidden = false;

  // Elementos del sidebar
  sidebarItems = [
    { title: 'Categorias', link: '/pages/categoria', icon: '🏠' },
    { title: 'Usuarios', link: '/pages/usuario', icon: '👤' },
    { title: 'Autores', link: '/pages/autor', icon: '⚙️' },
    { title: 'Libros', link: '/pages/libro', icon: '🚪' }
  ];

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
