import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
{path:'', pathMatch: 'full', redirectTo:'/auth/signin'},
{
  path: 'auth',
  loadChildren:  () => import('../app/auth/auth.module').then(m => m.AuthModule) ,
},
{
  path: 'pages',
  //canActivate:[AuthGuard],
  loadChildren:  () => import('../app/pages/pages.module').then(m => m.PagesModule) ,
},
{
  path: '**',
  redirectTo: '/auth/signin'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
