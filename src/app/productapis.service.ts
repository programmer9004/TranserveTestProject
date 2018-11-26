import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



@Injectable()
export class ProductapisService {
  
  public productSubject = new Subject<any>() //Used to communicate with root component
  public messageSubject = new BehaviorSubject<any>(''); //Used to communicate with all the components
  public errorMessageSubject = new BehaviorSubject<any>(''); //Used to communicate with all the components
  save_url: string = 'http://richardmendes.me/simple_pos/index.php/product/save_product_api';
  upload_url: string = 'http://richardmendes.me/simple_pos/index.php/product/upload_url';
  authenticate: string = 'http://richardmendes.me/simple_pos/index.php/product/authenticate';
  save_user_url: string = 'http://richardmendes.me/simple_pos/index.php/product/save_user_api';
  check_unique_product: string = 'http://richardmendes.me/simple_pos/index.php/product/check_unique_product';
  check_unique_email: string = 'http://richardmendes.me/simple_pos/index.php/product/check_unique_email';
  update_url: string = 'http://richardmendes.me/simple_pos/index.php/product/update_product';
  fetch_edit_product: string = 'http://richardmendes.me/simple_pos/index.php/product/fetch_edit_product';
  save_prject_url: string = 'http://richardmendes.me/simple_pos/index.php/product/save_prject_url';
      url: string = 'http://richardmendes.me/simple_pos/index.php/product/get_products';
      fetch_projects: string = 'http://richardmendes.me/simple_pos/index.php/product/fetch_projects';
      getUsers: string = 'http://richardmendes.me/simple_pos/index.php/product/get_profile_users';
      getForms: string = 'http://richardmendes.me/simple_pos/index.php/product/get_forms';
      get_search_projects: string = 'http://richardmendes.me/simple_pos/index.php/product/get_search_projects';

    theMainLoader=false;

    producName = "Paste";
    tempro='';

    constructor(private _http: Http) {
    
     }

     authenticateUser(logincred){
        return this._http.post(this.authenticate, logincred)
            .map((response: Response) => response.json())
     }

     uploadFileServer(file){
         return this._http.post(this.upload_url, file)
            .map((response: Response) => response.json())
     }

     checkUniqueProduct(uniqueProduct){
          return this._http.post(this.check_unique_product, uniqueProduct)
            .map((response: Response) => response.json())
     }

     checkUniqueEmail(email){
          return this._http.post(this.check_unique_email, email)
            .map((response: Response) => response.json())
     }

     set_message(newdata){
       this.messageSubject.next(newdata);
     }

     set_error_message(message){
       this.errorMessageSubject.next(message);
     }

     testSubject(data){
        this.productSubject.next(data);
     }

     get_main_loader(){
       return this.theMainLoader;
     }

     set_main_loader(value){
       this.theMainLoader=value;
       return this.theMainLoader;
     }

    getProducts(proName){
      return this._http.post(this.url,proName)
                .map((response: Response) =>response.json())
                .catch(this._errorHandler);
    }

    getSearchedProject(body){
     return this._http.post(this.get_search_projects,body)
                .map((response: Response) =>response.json())
                .catch(this._errorHandler);
    }

    getProjects(){
       return this._http.get(this.fetch_projects)
                .map((response: Response) =>response.json())
                .catch(this._errorHandler);
    }

    get_profile_users(){
       return this._http.get(this.getUsers)
                .map((response: Response) =>response.json())
                .catch(this._errorHandler);
    }

    get_forms(){
      return this._http.get(this.getForms)
                .map((response: Response) =>response.json())
                .catch(this._errorHandler);
    }

    updateProduct(product){
       return this._http.post(this.update_url, product)
          .map((response: Response) => response.json());
    }

    getSingleProduct(id){
      return this._http.post(this.fetch_edit_product, id)
          .map((response: Response) => response.json());
    }

    saveProduct(customer){
          return this._http.post(this.save_url, customer)
          .map((response: Response) => response.json());
    }

    saveProject(project){
        return this._http.post(this.save_prject_url, project)
          .map((response: Response) => response.json());
    }

     saveUser(user){
          return this._http.post(this.save_user_url, user)
          .map((response: Response) => response.json());
    }

    _errorHandler(error:Response){
      debugger;
      console.log(error);
      return Observable.throw(error || "Internal server error");
    }



}
