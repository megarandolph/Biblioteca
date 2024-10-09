import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, Optional  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrl: './usuario-modal.component.css',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    CommonModule,
  ],
  providers: [],
  
})
export class UsuarioModalComponent implements OnInit{
  
  form: FormGroup
  formInvalid: boolean = false;
  
  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<UsuarioModalComponent>,    
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any    
  ) {
    this.form = this.fb.group({
      usuarioId: new FormControl(0),
      email: new FormControl('', [Validators.required, Validators.email]),
      rolId: new FormControl(0, Validators.required),     
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
    const usuarioModel = this.form?.value as Usuario;
    if(this.data.mode == 'add'){         
      this.save(usuarioModel);
    }else if(this.data.mode == 'edit'){
      this.update(usuarioModel);
    }else if(this.data.mode == 'delete'){
      this.delete(usuarioModel.usuarioId);
    }
  }
  update(usuarioModel: Usuario){    
    this.usuarioService.putUsuario(usuarioModel).subscribe({
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
  save(usuarioModel: Usuario){    
    this.usuarioService.postUsuario(usuarioModel).subscribe({
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
  delete(usuarioId: number){    
    this.usuarioService.deleteUsuario(usuarioId).subscribe({
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
