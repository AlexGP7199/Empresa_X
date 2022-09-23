import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientFormComponent } from '../client-form/client-form.component';
import { Client } from '../model/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  searchKey: string ="";
  public clients : Client[] = []
  displayedColumns: string[] = ['id', 'fName',"lName","cedula","phoneNumber",'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(private router : Router, private clientServices : ClientService , public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllClient();
  
  }

  openDialog(){
    this.dialog.open(ClientFormComponent, {
      width: '50%',
      height: '50%'
      
    }).afterClosed().subscribe(value => {
      if(value === 'save')
        this.getAllClient();
    })

  }
  editclient(row : any){
    this.dialog.open(ClientFormComponent, {
      width: '50%',
      height: '50%',
      data: row
      
    }).afterClosed().subscribe(value => {
      if(value === 'update')
        this.getAllClient();
    })
  }
  

  getAllClient(){
    this.clientServices.getAllClients().subscribe({
      next : (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("traje:" ,this.dataSource)
      }, error: (err) => {
        Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'No ha podido obtener informacion del servidor!',  
       })
     }
    })
  }

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  navegate(id:number){
    this.router.navigate(["/clientDetail/",id]);
  }
 
deleteclient(id: number){
  Swal.fire({
    title: 'Estas seguro?',
    text: "Estas a punto de eliminar una noticia!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, deseo eliminarlo!'
  }).then((result) => {
      if(result.isConfirmed){
        this.clientServices.DeleteClientByIDClient(id).subscribe({
          next: (result) => {
            Swal.fire(
              'Cliente Eliminado!',
              'Su Cliente fue eliminado exitosamente!',
              'success'
            );
            this.getAllClient();
          }, error:() => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se pudo eliminar su Cliente!',
            })
          
          }
        })
      }
    })
  }

}