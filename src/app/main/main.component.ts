import { Component, OnInit } from '@angular/core';
import { ProductapisService } from '../productapis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private _productService : ProductapisService, private _router: Router) { }
  mainLoader;

  currentUser;
  form_succ;

  displayName="";
  ngOnInit() {

      this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
  	  this.mainLoader=this._productService.get_main_loader();

      
      this._productService.productSubject.subscribe(data=>this.mainLoader=data); 
     
      if(!this.currentUser){
         this._router.navigate(['login']);
      }else{
      	this.displayName=this.currentUser.name;
      }
  }

  logout(){
  	localStorage.setItem('currentUser',null);
  	 this.form_succ="Logged out successfully";
     this._productService.set_message(this.form_succ);
     this._router.navigate(['login']);
  }

}
