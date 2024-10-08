import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaModalComponent } from './categoria-modal/categoria-modal.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit{
  
  
  CategoriaList: any[] = [];
  rolId:any = localStorage.getItem('rolId');


  // Parámetros de la paginación
  pageSize = 5;
  currentPage = 1;
  searchTerm: string = '';


  constructor(
    public dialog: MatDialog, 
    private CategoriaServices: CategoriaService,
    private router: Router
  ){}

  ngOnInit(): void {
    if(this.rolId == 2)
      {      
        this.getCategorias();
      }
      else{
        this.router.navigate(['/']);
      }
    
  }
  // Obtener Categorias paginados
  get paginatedCategoria() {
    const filteredCategoria = this.CategoriaList.filter(categoria => 
      categoria.nombre?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      categoria.categoriaId.toString().includes(this.searchTerm)
    );
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return filteredCategoria.slice(startIndex, endIndex);
  }

  // Cambiar de página
  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getCategorias(){
    this.CategoriaServices.getCategoria().subscribe({
      next: (res: any) => {
        this.CategoriaList = res.dataList;                
      },
      error: err => ('Ocurrió un error al obtener el listado de Categorias')
    })

  }

  openDialog(item: any, mode: any, title: any) {   
    const dialogRef = this.dialog.open(CategoriaModalComponent, {
      data: { item, mode, title },
    });
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
       
        if (!res) return
        if (res) {
          this.getCategorias()
        }
      }
    });
  }

}
