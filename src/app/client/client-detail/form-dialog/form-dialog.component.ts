import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DirectionService } from '../direction.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {
  public isNotAbleTO : boolean = true;
  public isEditing : boolean = false; 

  constructor(private formBuilder : FormBuilder,private dialogRef : MatDialogRef<FormDialogComponent>, @Inject(MAT_DIALOG_DATA) public editData : any, private directionService: DirectionService) { }

  directionForm !: FormGroup
  actionBtn : string = "Guardar"
  
  ngOnInit(): void {
    console.log('editData', this.editData);
    this.directionForm = this.formBuilder.group({
      direction : ['', Validators.required],
      clientId : ['', Validators.required]
    })
    if(this.editData.id){
      this.actionBtn = "Actualizar"
      this.directionForm.controls["direction"].setValue(this.editData.direction);
      this.directionForm.controls["clientId"].setValue(this.editData.clientId);
      this.isEditing = true;
    } 
  }

  addDirection(){
    console.log('add', {clientId:this.editData.idClient, direction:this.directionForm.value.direction});
    /*if(!this.editData.id){ */
      // if(this.directionForm.valid){
        this.directionService.postNewDirections({clientId:this.editData.idClient, direction: this.directionForm.value.direction}).subscribe({
          next: (result) => {
            Swal.fire(
              'Direccion Creada!',
              'Su direccion fue creada exitosamente!',
              'success',
            )
            this.directionForm.reset();
            this.dialogRef.close('save');
          }, error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se pudo crear su Direccion!',
            })
          }
        })
      // }
    /*}else {
      console.log(this.directionForm.valid)
      this.updateDirection();
    }*/
  }


  updateDirection(){
    this.directionService.updateDirection(this.directionForm.value, this.editData.id).subscribe({
      next: (res) => {
        Swal.fire(
          'Direccion Actualizada!',
          'Su direccion fue actualizada exitosamente!',
          'success'
        )
        this.directionForm.reset();
        this.dialogRef.close('update')
      }, error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo actualizar su direccion!',
        })
      }
    })
  }


}

