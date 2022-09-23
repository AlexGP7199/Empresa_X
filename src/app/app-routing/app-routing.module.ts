import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from '../client/client.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { ClientDetailComponent } from '../client/client-detail/client-detail.component';

const routes: Routes = [
  {path:'', redirectTo: 'client', pathMatch: 'full'},
  {path:'client', component: ClientComponent},
  {path: 'clientDetail/:id', component: ClientDetailComponent},
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
