import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Products } from "../model/product";
import "rxjs/add/operator/map";
import { AppResponse } from "../model/app-response";
/**
 * this is class which is used to bring data from rest api and
 * this data will be used inside component class
 *   providers: [ProductService],
     bootstrap: [AppComponent]
     do not forget to mention this service class inside 
     app-module.ts as shown in above
 * 
 */
@Injectable()
export class ProductService{

    constructor(private http: Http){
    }

    public loadProducts() : Observable<Products[]> {
        //step is normal response
        let step=this.http.get("http://localhost:3000/v1/products");
        //Now we have to read response as json
        //jsonData hold arary of JavaScript object
        let jsonData=step.map((response) => response.json());
        //Iterating all the JavaScript Object and converting into
        //Products type & finally creating Array of Products
         jsonData.map((item) => {
                let model = new Products();
                model.pid= item.pid;
                model.name= item.name;  
                model.image= item.image;
                model.price= item.price;
                model.store= item.store;
                model.mfg= item.mfg;
                model.category= item.category;
                console.log(item);
                return model;
        });
        return jsonData;
     }

     /**
      * 
      * @param mid mongoid given to the added product
      * by the mongodb database
      */
     public deleteProductByPid(mid:string) : Observable<AppResponse> {
        //step is normal response
        console.log("mid  = "+mid);
        let step=this.http.delete("http://localhost:3000/v1/products/"+mid);
        //Now we have to read response as json
        //jsonData hold arary of JavaScript object
        //var data={status:"success",message:"Hey! your profile has been deleted successfully into the database!!!!!!!!!!!!!!!"};
		//res.json(data);
        let jsonData=step.map((response) => response.json());
        return jsonData;
     }

      /**
      * 
      * @param mid mongoid given to the added product
      * by the mongodb database
      */
     public addProduct(product:Products) : Observable<AppResponse> {
        //step is normal response
        //console.log("mid  = "+mid);
        console.log("_@_@_@Uploading produc data!");
        console.log(product);
        //setting data into post
        var options = new RequestOptions({
            headers: new Headers({
              'Accept': 'application/json',
              'Content-Type': 'application/json'})
          });
        // first - URI
        //second //product =body
        //third  options =header
        let step=this.http.post("http://localhost:3000/v1/products",product,options);
        //Now we have to read response as json
        //jsonData hold arary of JavaScript object
        //var data={status:"success",message:"Hey! your profile has been deleted successfully into the database!!!!!!!!!!!!!!!"};
		//res.json(data);
        let jsonData=step.map((response) => response.json());
        return jsonData;
     }


}