import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, Optional  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AutorService } from '../../../services/autor.service';
import { Autor } from '../../../models/autor.model';


@Component({
  selector: 'app-autor-modal',
  templateUrl: './autor-modal.component.html',
  styleUrl: './autor-modal.component.css',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    CommonModule,
  ],
  providers: [],
  
})
export class AutorModalComponent implements OnInit{
  
  form: FormGroup
  formInvalid: boolean = false;
  
  constructor(
    private AutorService: AutorService,
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<AutorModalComponent>,    
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any    
  ) {
    this.form = this.fb.group({
      autorId: new FormControl(0),
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
    const AutorModel = this.form?.value as Autor;
    if(this.data.mode == 'add'){         
      this.save(AutorModel);
    }else if(this.data.mode == 'edit'){
      this.update(AutorModel);
    }else if(this.data.mode == 'delete'){
      this.delete(AutorModel.autorId);
    }
  }
  update(AutorModel: Autor){    
    this.AutorService.putAutor(AutorModel).subscribe({
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
  save(AutorModel: Autor){    
    this.AutorService.postAutor(AutorModel).subscribe({
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
  delete(AutorId: number){    
    this.AutorService.deleteAutor(AutorId).subscribe({
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
