import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Direction } from '../model/directions';
import { ClientService } from '../services/client.service';
import { DirectionService } from './direction.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  searchKey: string ="";
  public Directions : Direction[] = []
  public clientId = 0;
  displayedColumns: string[] = ['id',"direction",'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private router : Router, private directionService: DirectionService, public dialog: MatDialog, private activatedRoute: ActivatedRoute) 
   {
    activatedRoute.params.subscribe((params) => {
      this.clientId = params['id'];
      if(!this.clientId){
        return;
      }
      /*if ( id !== null ) {
        this.(id);
      }*/
     }); 
   }

  ngOnInit(): void {
    this.getAllDirections(this.clientId);
  }

  getAllDirections(id : number){
    this.directionService.getDirectionsByClientId(id).subscribe({
      next : (result) => {
        this.dataSource = new MatTableDataSource(result);
        // Guardar el result para quedarnos con el clientId de la direccion.
        this.Directions = result;
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
  editclient(row : any){
    this.dialog.open(FormDialogComponent, {
      width: '50%',
      height: '50%',
      data: row
    }).afterClosed().subscribe(value => {
      if(value === 'update')
        this.getAllDirections(this.clientId);
    })
  }
  openDialog(){
    this.dialog.open(FormDialogComponent, {
      width: '50%',
      height: '50%',
      data : {idClient : this.clientId}
    }).afterClosed().subscribe(value => {
      if(value === 'save')
        this.getAllDirections(this.clientId);
    })

  }
  deleteDirection(id: number){
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
          this.directionService.deleteDirection(id).subscribe({
            next: (result) => {
              Swal.fire(
                'Direccion Eliminada!',
                'Su Direccion fue eliminada exitosamente!',
                'success'
              );
              this.getAllDirections(this.clientId)
            }, error:() => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo eliminar su Direccion!',
              })
            
            }
          })
        }
      })
    }

}
