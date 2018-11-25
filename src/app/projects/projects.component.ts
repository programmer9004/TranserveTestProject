import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { HttpModule} from '@angular/http';
import { ProductapisService } from '../productapis.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
public title = "Project Listing";
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
  projects;
  currentUser;
  real_info;
  project;
  created_at;
  updated_at;



  constructor(private _productService : ProductapisService) { }

  ngOnInit() {
  		 this._productService.testSubject(this.showLoader);
  	  this._productService.getProjects().subscribe(data => {
           this.projects = data;
          // console.log(data[0]);
           this.showLoader=false;
          
           this.project=data && data[0].project;
           this.created_at=data && data[0].created_at;
           this.updated_at=data && data[0].updated_at;
            
           this.showLoader=false;
           this._productService.testSubject(this.showLoader);


        },
        error => this.errorMessage = error )

  	    this._productService.messageSubject.subscribe(data=>{this.message=data});
  }

  get_info(project){
  	 this.project=project;
           this.project=project.project;
           this.created_at=project.created_at;
           this.updated_at=project.updated_at;
            
  }

    onSearchName(productName){
  	
  	this.proName=productName;
     let data = {
            "projectName": this.proName          
        }
     let body = JSON.stringify(data);


  	 this._productService.getSearchedProject(body).subscribe(data => {
  	 	    this.projects = data;
           this.project=data && data[0].project;
           this.created_at=data && data[0].created_at;
           this.updated_at=data && data[0].updated_at;
            
        },
      error => this.errorMessage = error )
  }

}
