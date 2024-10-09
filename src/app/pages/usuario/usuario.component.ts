import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioModalComponent } from './usuario-modal/usuario-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '../../services/usuario.service';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit{
  
  
  usuarioList: any[] = [];
  rolId:any = localStorage.getItem('rolId');


  // Parámetros de la paginación
  pageSize = 5;
  currentPage = 1;
  searchTerm: string = '';


  constructor(
    public dialog: MatDialog, 
    private usuarioServices: UsuarioService,
    private router: Router
  ){}

  ngOnInit(): void {    
    if(this.rolId == 2)
    {      
      this.getUsuarios();
    }
    else{
      this.router.navigate(['/']);
    }
      
  }
  // Obtener usuarios paginados
  get paginatedUsers() {
    const filteredUsers = this.usuarioList.filter(user => 
      user.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.usuarioId.toString().includes(this.searchTerm)
    );
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return filteredUsers.slice(startIndex, endIndex);
  }

  // Cambiar de página
  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getUsuarios(){
    this.usuarioServices.getUsuario().subscribe({
      next: (res: any) => {
        this.usuarioList = res.dataList;                
      },
      error: err => ('Ocurrió un error al obtener el listado de usuarios')
    })

  }

  openDialog(item: any, mode: any, title: any) {   
    const dialogRef = this.dialog.open(UsuarioModalComponent, {
      data: { item, mode, title },
    });
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
       
        if (!res) return
        if (res) {
          this.getUsuarios()
        }
      }
    });
  }
}
