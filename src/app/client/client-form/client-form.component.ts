import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormDialogComponent } from '../client-detail/form-dialog/form-dialog.component';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, private dialogRef : MatDialogRef<ClientFormComponent>, @Inject(MAT_DIALOG_DATA) public editData : any, private clientService : ClientService) { }
  clientForm !: FormGroup
  actionBtn : string = "Guardar"
  
  ngOnInit(): void {
    console.log(this.editData)
    this.clientForm = this.formBuilder.group({
      fname : ['', Validators.required],
      lname : ['', Validators.required],
      cedula : ['', Validators.required],
      cellphoneNumber : ['', Validators.required],

    })
    if(this.editData){
      this.actionBtn = "Actualizar"
      this.clientForm.controls['fname'].setValue(this.editData.fName);
      this.clientForm.controls['lname'].setValue(this.editData.lName);
      this.clientForm.controls['cedula'].setValue(this.editData.cedula);
      this.clientForm.controls['cellphoneNumber'].setValue(this.editData.cellphoneNumber);
      
      
    }

  
  }

  addClient() {
    if(!this.editData){
      if(this.clientForm.valid){
        this.clientService.postNewClient(this.clientForm.value).subscribe({
          next : (res) => {
            Swal.fire(
              'Cliente Creado!',
              'Su cliente fue creado exitosamente!',
              'success',
            )
            this.clientForm.reset();
            this.dialogRef.close('save')
          }, error:(err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se pudo crear su Cliente!',
            })
          }
        })
      }
    }else {
      this.updateClient()
    }
  }

  updateClient(){
    this.clientService.updateClient(this.clientForm.value, this.editData.id).subscribe({
      next : (res) => {
        Swal.fire(
          'Cliente Actualizado!',
          'Su Cliente fue actualizado exitosamente!',
          'success'
        )
        this.clientForm.reset();
        this.dialogRef.close('update')
      }, error:(err) => {
        //console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo actualizar su Cliente!',
        })
      }
    })
  }

}
