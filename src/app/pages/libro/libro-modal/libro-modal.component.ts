import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit, Optional  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { LibroService } from '../../../services/libro.service';
import { Libro } from '../../../models/libro.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategoriaService } from '../../../services/categoria.service';
import { AutorService } from '../../../services/autor.service';


@Component({
  selector: 'app-libro-modal',
  templateUrl: './libro-modal.component.html',
  styleUrl: './libro-modal.component.css',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    CommonModule,
    NgSelectModule
  ],
  providers: [DatePipe],
  
})
export class LibroModalComponent implements OnInit{
  
  form: FormGroup
  formInvalid: boolean = false;
  categoriasList: any[] = [];

  autoresList: any[] = [];
  
  constructor(
    private datepipe: DatePipe,
    private LibroService: LibroService,
    private categoriaServices: CategoriaService,
    private autorServices: AutorService,
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<LibroModalComponent>,    
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any    
  ) {
    this.form = this.fb.group({
      libroId: new FormControl(0),
      titulo: new FormControl('', [Validators.required]),      
      descripcion: new FormControl('', [Validators.required]),      
      fechaPublicacion: new FormControl(this.datepipe.transform(new Date, 'yyyy-MM-dd'), Validators.required),      
      status: new FormControl(true),
      categorias: [[]],
      autores: [[]]
    })
    
    if(this.data?.item){
      
      if (this.data && this.data.item) {
        this.data.item.fechaPublicacion = this.datepipe.transform(this.data.item.fechaPublicacion, 'yyyy-MM-dd');
      }

      this.form.patchValue({...this.data?.item});           
    }
    if(this.data?.mode == 'view'){
      this.form.disable();
    }
    
  }
  ngOnInit(): void {  
    this.getCategorias()
    this.getAutores()
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

  getCategoriaName(id: number) {
    const categoria = this.categoriasList.find(cat => cat.categoriaId === id);
    return categoria ? categoria.nombre : 'Desconocido';
  }

  getAutorName(id: number) {
    const autor = this.autoresList.find(a => a.autorId === id);
    return autor ? autor.nombre : 'Desconocido';
  }

  Accept() {
    if(this.form.invalid){
      this.formInvalid = true;
      return;
    }
    this.formInvalid = false;
    const LibroModel = this.form?.value as Libro;
    if(this.data.mode == 'add'){         
      this.save(LibroModel);
    }else if(this.data.mode == 'edit'){
      this.update(LibroModel);
    }else if(this.data.mode == 'delete'){
      this.delete(LibroModel.libroId);
    }
  }
  update(LibroModel: Libro){    
    this.LibroService.putLibro(LibroModel).subscribe({
      next: (res:any) => {
        

        if(res.errors.length> 0){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.errors[0],
            showConfirmButton: false,
            timer: 2000
          }); return}
        if(res.warnings.length> 0){
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: res.warnings[0],
            showConfirmButton: false,
            timer: 2000
          });return}

          Swal.fire({
            icon: 'success',
            title: 'Proceso completado',
            text: 'El proceso se realizó con éxito',
            showConfirmButton: false,
            timer: 2000
          });
        this.closeDialog()
      }, error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error inesperado',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }
  save(LibroModel: Libro){    
    this.LibroService.postLibro(LibroModel).subscribe({
      next: (res:any) => {
        if(res.errors.length> 0){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.errors[0],
            showConfirmButton: false,
            timer: 2000
          }); return}
        if(res.warnings.length> 0){
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: res.warnings[0],
            showConfirmButton: false,
            timer: 2000
          });return}

          Swal.fire({
            icon: 'success',
            title: 'Proceso completado',
            text: 'El proceso se realizó con éxito',
            showConfirmButton: false,
            timer: 2000
          });
        this.closeDialog()
      }, error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error inesperado',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }
  delete(LibroId: number){    
    this.LibroService.deleteLibro(LibroId).subscribe({
      next: (res:any) => {
        if(res.errors.length> 0){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.errors[0],
            showConfirmButton: false,
            timer: 2000
          }); return}
        if(res.warnings.length> 0){
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: res.warnings[0],
            showConfirmButton: false,
            timer: 2000
          });return}

          Swal.fire({
            icon: 'success',
            title: 'Proceso completado',
            text: 'El proceso se realizó con éxito',
            showConfirmButton: false,
            timer: 2000
          });
        this.closeDialog()
      }, error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error inesperado',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }
  getError(name: string) {
    if (!this.formInvalid) {
      return '';
    }  
    return  
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }
  
}
