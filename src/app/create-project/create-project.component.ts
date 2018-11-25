import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms'; //Abstract class is used for custom validations
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http';
import { HttpModule} from '@angular/http';
import { ProductapisService } from '../productapis.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
 public title="Add New Project";
  public form_err = "";
  public form_succ = "";
  public showLoader=false;
  public tempProductName;
  public symbols:Array<any> = [];
  selectedSymbol;
  customers: Array<any> = [];
  errorMessage: any;
  uniqueStatus:any;
  uniqueStatusLoader:any;
  selectedFile = null;
  fullFile = null;
 message;
 users;
forms;

 projectForm: FormGroup; 

  constructor(private _fb: FormBuilder,private _productService : ProductapisService,private _router: Router) { 
        this.projectForm = this._fb.group({
          project: ['', Validators.compose([Validators.required])],
          description:['', [Validators.required]],
          formsubmitted:['', [Validators.required]],
          users:['', [Validators.required]],
          symbol:['', [Validators.required]]
        
         
        });

        this.symbols = [
        {
        id:1,
        label: "Default",
        value: 1
        }, {
        	 id:2,
        label: "Symbol 1",
        value: 2
        }, {
        	id:3,
         label: "Symbol 2",
         value: 3
        }
        ];

        this.selectedSymbol=1;
  }

  ngOnInit() {
  	 this._productService.testSubject(this.showLoader);
  	  this._productService.get_profile_users().subscribe(data => {
           this.users = data;
           this.showLoader=false;
           this._productService.testSubject(this.showLoader);


        },
        error => this.errorMessage = error )

  	   this._productService.get_forms().subscribe(data => {
           this.forms = data;
           this.showLoader=false;
           this._productService.testSubject(this.showLoader);


        },
        error => this.errorMessage = error )



  	   this._productService.messageSubject.subscribe(data=>{this.message=data}); 
  }

  save(){
    if(!this.projectForm.valid){
            this.form_err="Please provide valid details to process";
     }else{
         
          this.showLoader=true;
           this._productService.testSubject(this.showLoader);
        	this.form_err="";
     	    this._productService.saveProject(this.projectForm.value).subscribe(custId => {
          this.form_succ="Project saved successfully";
          this._productService.set_message(this.form_succ);
          this.projectForm.reset();
          this._router.navigate([''])

        },
        error => this.errorMessage = error )
     	
     }
  }

}
