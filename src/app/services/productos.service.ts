import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Producto} from "../interface/productos";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando=true;
  productos : Producto []=[];
  productofiltrado: Producto[]=[];

  constructor(private http:HttpClient) {

    this.cargarproductos();
   }

   private cargarproductos(){

    return  new Promise((resolve,reject)=>{
      this.http.get("https://angular-html-e32d0.firebaseio.com/productos_idx.json")
      .subscribe((resp:Producto[])=>{
        this.cargando=false;
        this.productos=resp;
      });



    });




   }

    getproducto(id:string){

    return this.http.get(`https://angular-html-e32d0.firebaseio.com/productos/${id}.json`)
      

   }

   buscarproducto(termino:string){


    if(this.productos.length===0){
      //cargar productos
      this.cargarproductos().then(()=>{
        //ejecutar despues de obtener los productos
        //aplicar el filtro
      this.filtrarproducto(termino);
      })
    }else{
      //aplicar el filtro
      this.filtrarproducto(termino);
    }







  

      // console.log(this.productofiltrado);
   }

   private filtrarproducto(termino:string){
    // this.productofiltrado=this.productos.filter(producto=>{
    //   return true;
    // })
    console.log(this.productos);
    this.productofiltrado=[];
    termino=termino.toLocaleLowerCase();
    

    this.productos.forEach(prod=>{
      const titulower=prod.titulo.toLocaleLowerCase();
      if(prod.categoria.indexOf(termino)>=0 || titulower.indexOf(termino)>=0){
        this.productofiltrado.push(prod);
      }

    })


   }


}
