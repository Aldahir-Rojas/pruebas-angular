import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interface/info-pagina';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info:InfoPagina={};
  cargada=false;
  equipo: any[]=[];

  constructor(private http: HttpClient) {

    this.cargarinfo();
    this.cargarequipo();
    // console.log("Listo");
   }

   private cargarinfo(){

      //LEER EL ARCHIVO JSON
    this.http.get("assets/data/data-pagina.json")
    .subscribe( (resp: InfoPagina)=>{

      // console.log(resp);
      // console.log(resp["titulo"]);
      this.cargada=true;
      this.info=resp;
      

   }
    )}

   private cargarequipo(){

    this.http.get("https://angular-html-e32d0.firebaseio.com/equipo.json")
    .subscribe((resp: any)=>{
      this.equipo=resp;
      // console.log(resp);
    })


   }


}