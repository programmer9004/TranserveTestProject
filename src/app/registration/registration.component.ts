import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms'; //Abstract class is used for custom validations
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http';
import { HttpModule} from '@angular/http';
import { ProductapisService } from '../productapis.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup; 
  passwordMatch;
  tempEmail;
  pendingStatus;
  emailStatus;
  showLoader;
  form_err;
  form_succ;
  errorMessage;
  mainLoader;
  constructor(private _fb: FormBuilder,private _productService : ProductapisService,private _router: Router) {
      this.registrationForm = this._fb.group({
          name: ['',[Validators.required], ],
          email:['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),Validators.required]],
         
          password: ['', Validators.required],
          confirm_password:   ['', Validators.required]
        })

   }


   getConfirmPassword(value){
      if(this.registrationForm.controls['password'].value==value){
        this.passwordMatch=true;
      }else{
      	 this.passwordMatch=false;
      }
   }


   emailExists(email){
       this.tempEmail = {"email": email};
       this.pendingStatus=true;
               this._productService.checkUniqueEmail(this.tempEmail).subscribe(data => {
                  this.pendingStatus=false;
                  if(data.statusCode=='1'){
                     this.emailStatus=true;
                  }else{
                     this.emailStatus=false;
                  }
               });
   }

     save(){

  	 if(!this.registrationForm.valid){
            this.form_err="Please provide valid details to process";
     }else{
          this.mainLoader=true;
           this._productService.testSubject(this.showLoader);
        	this.form_err="";
     	    this._productService.saveUser(this.registrationForm.value).subscribe(custId => {
          this.form_succ="User saved, You can now login";
          localStorage.setItem('currentUser',JSON.stringify({token:"rdx", name:"Richard Mendes"}));
          this._productService.set_message(this.form_succ);
          this.registrationForm.reset();
          this._router.navigate(['login'])

        },
        error => this.errorMessage = error )
     	
     }
  }






  ngOnInit() {
  }

}

export class PasswordValidation {

static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirm_password').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({MatchPassword: true})
    } else {
        return null
    }
}
}  


