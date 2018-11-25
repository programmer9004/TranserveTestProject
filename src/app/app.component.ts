import { Component, OnInit } from '@angular/core';
import { ProductapisService } from './productapis.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  public mainLoader:boolean;
  constructor(private _productService : ProductapisService){
    this.mainLoader=this._productService.get_main_loader();

    this._productService.productSubject.subscribe(data=>this.mainLoader=data);  
  }
 

  

}
