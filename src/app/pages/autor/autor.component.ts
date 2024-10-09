import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AutorService } from '../../services/autor.service';
import { AutorModalComponent } from './autor-modal/autor-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Autor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './Autor.component.html',
  styleUrl: './Autor.component.css'
})
export class AutorComponent implements OnInit{
  
  
  AutorList: any[] = [];
  rolId:any = localStorage.getItem('rolId');


  // Parámetros de la paginación
  pageSize = 5;
  currentPage = 1;
  searchTerm: string = '';


  constructor(
    public dialog: MatDialog, 
    private AutorServices: AutorService,
    private router: Router
  ){}

  ngOnInit(): void {
    if(this.rolId == 1)
      {
        this.getAutors();
      }
      else{
        this.router.navigate(['/']);
      }
    
  }
  // Obtener Autors paginados
  get paginatedAutor() {
    const filteredAutor = this.AutorList.filter(Autor => 
      Autor.nombre?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      Autor.autorId.toString().includes(this.searchTerm)
    );
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return filteredAutor.slice(startIndex, endIndex);
  }

  // Cambiar de página
  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getAutors(){
    this.AutorServices.getAutor().subscribe({
      next: (res: any) => {
        this.AutorList = res.dataList;                
      },
      error: err => ('Ocurrió un error al obtener el listado de autores')
    })

  }

  openDialog(item: any, mode: any, title: any) {   
    const dialogRef = this.dialog.open(AutorModalComponent, {
      data: { item, mode, title },
    });
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
       
        if (!res) return
        if (res) {
          this.getAutors()
        }
      }
    });
  }

}
