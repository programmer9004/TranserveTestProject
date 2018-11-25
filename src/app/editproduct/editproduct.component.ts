import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { HttpModule} from '@angular/http';
import { ProductapisService } from '../productapis.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  public edit_id;
  public edit_raw_data;
  public errorMessage;
  public form_succ;
  public showLoader=true;
   productForm: FormGroup; 
  constructor(private _fb: FormBuilder,private _router: Router,private route: ActivatedRoute, private _productService : ProductapisService) {
     this.productForm = this._fb.group({
     	  id : '',
          product_name: ['', [Validators.required,
                      Validators.minLength(3),
                      Validators.maxLength(30)]],
          product_price:['', [Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]],
          product_description: ['', [Validators.required]]
         
        })
   }

  ngOnInit() {
  	 this._productService.testSubject(this.showLoader);
  	 this.route.params.subscribe(params => {
      this.edit_id = params['id']; // --> Name must match wanted parameter

      this._productService.getSingleProduct(this.edit_id).subscribe(data => {
               this.edit_raw_data = data;
               this.productForm.controls['product_name'].setValue(this.edit_raw_data && this.edit_raw_data[0].product_name);
               this.productForm.controls['product_price'].setValue(this.edit_raw_data && this.edit_raw_data[0].product_price);
               this.productForm.controls['product_description'].setValue(this.edit_raw_data && this.edit_raw_data[0].product_description);
              this.showLoader=false;
               this._productService.testSubject(this.showLoader);
        },
        error => this.errorMessage = error)
    });

   
  }

  update(){

  	     if(!this.productForm.valid){
            alert('Invalid form');
         }else{
         	this.showLoader=true;
         	this._productService.testSubject(this.showLoader);
            this.productForm.controls['id'].setValue(this.edit_id);
            this._productService.updateProduct(this.productForm.value).subscribe(custId => {
            this.form_succ="Product updated successfully";
             this._productService.set_message(this.form_succ);
            this.productForm.reset();
            this._router.navigate([''])
            this.showLoader=false;

            },
            error => this.errorMessage = error )
            }
    
  }


}
