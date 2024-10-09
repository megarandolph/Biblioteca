import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, Optional  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../models/categoria.model';

@Component({
  selector: 'app-Categoria-modal',
  templateUrl: './Categoria-modal.component.html',
  styleUrl: './Categoria-modal.component.css',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    CommonModule,
  ],
  providers: [],
  
})
export class CategoriaModalComponent implements OnInit{
  
  form: FormGroup
  formInvalid: boolean = false;
  
  constructor(
    private CategoriaService: CategoriaService,
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<CategoriaModalComponent>,    
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any    
  ) {
    this.form = this.fb.group({
      categoriaId: new FormControl(0),
      nombre: new FormControl('', [Validators.required]),      
      status: new FormControl(true)
    })
    
    if(this.data?.item){
      this.form.patchValue({...this.data?.item});           
    }
    if(this.data?.mode == 'view'){
      this.form.disable();
    }
    
  }
  ngOnInit(): void {  

  }


  Accept() {
    if(this.form.invalid){
      this.formInvalid = true;
      return;
    }
    this.formInvalid = false;
    const CategoriaModel = this.form?.value as Categoria;
    if(this.data.mode == 'add'){         
      this.save(CategoriaModel);
    }else if(this.data.mode == 'edit'){
      this.update(CategoriaModel);
    }else if(this.data.mode == 'delete'){
      this.delete(CategoriaModel.categoriaId);
    }
  }
  update(CategoriaModel: Categoria){    
    this.CategoriaService.putCategoria(CategoriaModel).subscribe({
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
  save(CategoriaModel: Categoria){    
    this.CategoriaService.postCategoria(CategoriaModel).subscribe({
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
  delete(CategoriaId: number){    
    this.CategoriaService.deleteCategoria(CategoriaId).subscribe({
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
