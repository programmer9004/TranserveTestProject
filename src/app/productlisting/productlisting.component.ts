import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { HttpModule} from '@angular/http';
import { ProductapisService } from '../productapis.service';


@Component({
  selector: 'app-productlisting',
  templateUrl: './productlisting.component.html',
  styleUrls: ['./productlisting.component.css']
})
export class ProductlistingComponent implements OnInit {
  public title = "Product Listing";
  public pageNumber =5;
  public dropNums = [ 5, 10, 20 ];
  public selectedDrop;
  public errorMessage;
  public products;
  public showLoader=true;
  public tableLoader = false;
  public proName="";
  public message="";
  public tt;
  currentUser;
  //@Output() countChanged: EventEmitter<string> =   new EventEmitter();


  constructor(private _productService : ProductapisService) { 
    
  }

 

  ngOnInit() {
  	 this.selectedDrop = this.pageNumber;
  	 
   

  	 let data = {
            "productName": this.proName          
        }
     let body = JSON.stringify(data);

      this._productService.testSubject(this.showLoader);
  	  this._productService.getProducts(body).subscribe(data => {
           this.products = data;
           this.showLoader=false;
           this._productService.testSubject(this.showLoader);


        },
        error => this.errorMessage = error )

  	   this._productService.messageSubject.subscribe(data=>{this.message=data});  
  	   
  }

  onChange(value){
  	this.pageNumber = value;
    
  }

  onSearchName(productName){
  	//this.showLoader=true;
  	this.tableLoader=true;
  	this.proName=productName;
     let data = {
            "productName": this.proName          
        }
     let body = JSON.stringify(data);


  	 this._productService.getProducts(body).subscribe(data => {
           this.products = data;
           this.tableLoader=false;
        },
      error => this.errorMessage = error )
  }





}
