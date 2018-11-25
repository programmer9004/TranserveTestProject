import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms'; //Abstract class is used for custom validations
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http';
import { HttpModule} from '@angular/http';
import { ProductapisService } from '../productapis.service'; 
import { Router } from '@angular/router';

import 'rxjs/add/operator/share';
import {map, take, debounce} from 'rxjs/operators';  //Used for custom validations


@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {
  public title="Add New Product";
  public form_err = "";
  public form_succ = "";
  public showLoader=false;
  public tempProductName;
  customers: Array<any> = [];
  errorMessage: any;
  uniqueStatus:any;
  uniqueStatusLoader:any;
  selectedFile = null;
  currentSymbol=1;
  fullFile = null;

    productForm: FormGroup; 
   constructor(private _fb: FormBuilder,private _productService : ProductapisService,private _router: Router) { 

         this.productForm = this._fb.group({
          product_name: ['', Validators.compose([Validators.required,
                      Validators.minLength(3),
                      Validators.maxLength(30)
                      ]),
                      ],
          product_price:['', [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
          product_image:[''],
          product_description: ['', [Validators.required]]
         
        })

       

            
    }

  ngOnInit() {
    this.uniqueStatus=false;
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0];
    this.fullFile=event;
    console.log(this.selectedFile);
  }

  
  getProductName(productVal){
       this.tempProductName = {"product_name": productVal};
       this.uniqueStatusLoader=true;
               this._productService.checkUniqueProduct(this.tempProductName).subscribe(data => {
                  this.uniqueStatusLoader=false;
                  if(data.statusCode=='1'){
                     this.uniqueStatus=true;
                  }else{
                     this.uniqueStatus=false;
                  }
               });
  }

  uploadFile(){
       let data = {
            "image_file": this.selectedFile,      
            "image_name": this.selectedFile.name,       
            "full_file": this.fullFile       
        }
        let body = JSON.stringify(data);


       this._productService.uploadFileServer(body).subscribe(log_message => {
          
         

       },
       error => this.errorMessage = error )
  }


  save(){
     
  	 if(!this.productForm.valid){
            this.form_err="Please provide valid details to process";
     }else{
          this.uploadFile();
          this.showLoader=true;
           this._productService.testSubject(this.showLoader);
           this.productForm.controls['product_image'].setValue(this.selectedFile.name);
        	this.form_err="";
     	    this._productService.saveProduct(this.productForm.value).subscribe(custId => {
          this.form_succ="Product saved successfully";
          this._productService.set_message(this.form_succ);
          this.productForm.reset();
          this._router.navigate([''])

        },
        error => this.errorMessage = error )
     	
     }
  }

}



