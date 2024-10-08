import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LibroService } from '../../services/libro.service';
import { LibroModalComponent } from './libro-modal/libro-modal.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent implements OnInit{
  
  
  LibroList: any[] = [];
  rolId:any = localStorage.getItem('rolId');


  // Parámetros de la paginación
  pageSize = 5;
  currentPage = 1;
  searchTerm: string = '';


  constructor(
    public dialog: MatDialog, 
    private LibroServices: LibroService,
    private router: Router
  ){}

  ngOnInit(): void {
    if(this.rolId == 1)
      {      
        this.getLibros();
      }
      else{
        this.router.navigate(['/']);
      }
  }
  // Obtener Libros paginados
  get paginatedLibro() {
    const filteredLibro = this.LibroList.filter(Libro => 
      Libro.titulo?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      Libro.libroId.toString().includes(this.searchTerm) ||
      Libro.descripcion?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return filteredLibro.slice(startIndex, endIndex);
  }

  // Cambiar de página
  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getLibros(){
    this.LibroServices.getLibro().subscribe({
      next: (res: any) => {
        this.LibroList = res.dataList;                
      },
      error: err => ('Ocurrió un error al obtener el listado de los libros')
    })

  }

  openDialog(item: any, mode: any, title: any) {   
    const dialogRef = this.dialog.open(LibroModalComponent, {
      data: { item, mode, title },
    });
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
       
        if (!res) return
        if (res) {
          this.getLibros()
        }
      }
    });
  }

}
