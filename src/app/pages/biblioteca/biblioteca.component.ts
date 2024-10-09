import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LibroService } from '../../services/libro.service';
import { LibroModalComponent } from '../libro/libro-modal/libro-modal.component';
import { CategoriaService } from '../../services/categoria.service';
import { AutorService } from '../../services/autor.service';


@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.css'
})
export class BibliotecaComponent implements OnInit{
  
  
  BibliotecaList: any[] = [];

  // Parámetros de la paginación
  pageSize = 5;
  currentPage = 1;
  searchTerm: string = '';

  // Filtros
  startDate: string = '';
  endDate: string = '';
  selectedCategory: number | string = '';
  selectedAutor: number | string = '';

  categoriasList: any[] = [];
  autoresList: any[] = [];

  constructor(
    public dialog: MatDialog, 
    private libroServices: LibroService,
    private categoriaServices: CategoriaService,
    private autorServices: AutorService,
  ){}

  ngOnInit(): void {
    this.getBibliotecas();  
    this.getCategorias()
    this.getAutores()
  }
  // Obtener Bibliotecas paginados
  get paginatedLibro() {
    let filteredBiblioteca = this.BibliotecaList;

    // Filtrar por título
    filteredBiblioteca = filteredBiblioteca.filter(libro =>
      libro.titulo?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Filtrar por categoría
    if (this.selectedCategory) {      
      filteredBiblioteca = filteredBiblioteca.filter(libro =>        
        libro.categorias.includes(Number(this.selectedCategory))
      );
    }

    // Filtrar por autores
    if (this.selectedAutor) {
      filteredBiblioteca = filteredBiblioteca.filter(libro =>
        libro.autores.includes(Number(this.selectedAutor))
      );
    }

    // Filtrar por rango de fechas
    if (this.startDate) {
      filteredBiblioteca = filteredBiblioteca.filter(libro =>
        new Date(libro.fechaPublicacion) >= new Date(this.startDate)
      );
    }
    if (this.endDate) {
      filteredBiblioteca = filteredBiblioteca.filter(libro =>
        new Date(libro.fechaPublicacion) <= new Date(this.endDate)
      );
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return filteredBiblioteca.slice(startIndex, endIndex);
  }

  // Cambiar de página
  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getBibliotecas(){
    this.libroServices.getLibro().subscribe({
      next: (res: any) => {
        this.BibliotecaList = res.dataList;                
      },
      error: err => ('Ocurrió un error al obtener el listado de los libros')
    })

  }
  
  getCategorias(){
    this.categoriaServices.getCategoria().subscribe({
      next: (res: any) => {
        this.categoriasList = res.dataList;                
      },
      error: err => ('Ocurrió un error al obtener el listado de las categorias')
    })

  }

  getAutores(){
    this.autorServices.getAutor().subscribe({
      next: (res: any) => {
        this.autoresList = res.dataList;                
      },
      error: err => ('Ocurrió un error al obtener el listado de los autores')
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
          this.getBibliotecas()
        }
      }
    });
  }

}
