import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {DataTableModule} from "angular2-datatable";

import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductlistingComponent } from './productlisting/productlisting.component';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';

import { ProductapisService } from './productapis.service';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductlistingComponent,
    CreateproductComponent,
    EditproductComponent,
    ViewproductComponent,
    MainComponent,
    LoginComponent,
    RegistrationComponent,
    ProjectsComponent,
    CreateProjectComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    DataTableModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegistrationComponent},
        {path: '', component: MainComponent,
        children: [
           {path: 'product/new', component: CreateproductComponent},
           {path: "product/view/:id", component: ViewproductComponent },
           {path: "product/edit/:id", component: EditproductComponent },
           {path: '',  redirectTo: 'dashboard', pathMatch: 'full'},
           {path: 'dashboard', component: ProjectsComponent},
           {path: 'projects', component: ProjectsComponent},
           {path: 'project/new', component: CreateProjectComponent},
         ]},
     
     ])
  ],
  providers: [ProductapisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
