
import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { HttpModule} from '@angular/http';
import { ProductapisService } from '../productapis.service';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message;
  err_message;
  currentUser;
  mainLoader;
  form_err;
  form_succ;
  errorMessage;
  showLoader;
  loginForm: FormGroup;
  constructor(private _fb: FormBuilder,private _productService : ProductapisService,private _router: Router) { 
    this.loginForm = this._fb.group({
          email:['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),Validators.required]],
          password: ['', Validators.required]
        })

  }

  ngOnInit() {
  	 this._productService.messageSubject.subscribe(data=>{this.message=data}); 
  	 this._productService.errorMessageSubject.subscribe(data=>{this.err_message=data}); 
  	 this.currentUser=JSON.parse(localStorage.getItem('currentUser'));


  	// alert(this.currentUser.name);

  	/* if(this.currentUser.token!=''){
  	 	alert('User os already set');
  	 }*/
    // localStorage.setItem('currentUser',null);

  	 if (this.currentUser) {
          this._router.navigate(['dashboard']);
     }
  }


  authenticate(){
      if(!this.loginForm.valid){
            this.form_err="Please provide valid details to process";
     }else{
          this.mainLoader=true;
          this._productService.testSubject(this.showLoader);
          this.form_err="";
     	  this._productService.authenticateUser(this.loginForm.value).subscribe(data => {
          this.form_succ="Logged in successfully";
         
          console.log(data.message);
          if(data.status==0){
          	 this.form_err=data.message;
          	 this.mainLoader=false;
          	  this._productService.set_error_message(this.form_err);
          	}else{
          		  localStorage.setItem('currentUser',JSON.stringify({token:"rdx", name:data.data.name, id:data.data.id, email:data.data.email}));
             this._productService.set_message(this.form_succ);
              this.form_err="";
               this._productService.set_error_message(this.form_err);
           this.loginForm.reset();
          this._router.navigate(['dashboard'])
          	}

          //console.log(data.data.id);
        
          
         

        },
        error => this.errorMessage = error )
     	
     }
  }

}
