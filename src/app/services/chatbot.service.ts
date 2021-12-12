import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface IAPICore{
  id            ?:  string
  concurrencia  ?:  boolean
  ruta          ?:  string
  funcion       ?:  string
  parametros    ?:  string
  protocolo     ?:  string
  retorna       ?:  boolean
  migrar        ?:  false
  modulo        ?:  string
  relacional    ?:  boolean
  coleccion     ?:  string
  version       ?:  string
  http          ?:  number
  https         ?:  number
  consumidores  ?:  string
  puertohttp    ?:  number
  puertohttps   ?:  number
  driver        ?:  string
  query         ?:  string
  metodo        ?:  string
  tipo          ?:  string
  prioridad     ?:  string
  logs          ?:  boolean
  descripcion   ?:  string
  entorno       ?:  string
  cache         ?:  number
  estatus       ?:  boolean
}

export interface IToken{
  token : string,
}


@Injectable({
  providedIn: 'root'
})



export class ChatbotService {

  style = `.media {
              padding: 16px 12px;
              -webkit-transition: background-color .2s linear;
              transition: background-color .2s linear;
            }
            .media-chat {
              padding-right: 64px;
              margin-bottom: 0;
            }

            .media .avatar {
              flex-shrink: 0;
            }
            .avatar {
              position: relative;
              display: inline-block;
              width: 56px;
              height: 56px;
              line-height: 56px;
              text-align: center;
              border-radius: 100%;
              background-color: #f5f6f7;
              color: #8b95a5;
              text-transform: uppercase;
            }
            .media-chat .media-body {
              -webkit-box-flex: initial;
              flex: initial;
              display: table;
            }
            .media-body {
              min-width: 0;
            }
            .media-chat .media-body p {
              position: relative;
              padding: 6px 8px;
              margin: 4px 0;
              background-color: #f5f6f7;
              border-radius: 3px;
              font-weight: 100;
              color: #000000;
            }
            .media>* {
              margin: 0 8px;
            }
            .media-chat .media-body p.meta {
              background-color: transparent !important;
              color: #3082d3;
              padding: 0;
              opacity: .8;
            }
            
            .media-chat.media-chat-reverse {
              padding-right: 12px;
              padding-left: 64px;
              -webkit-box-orient: horizontal;
              -webkit-box-direction: reverse;
              flex-direction: row-reverse;
          }
          
          .media-chat {
              padding-right: 64px;
              margin-bottom: 0;
          }
          
          
          
          .media-chat.media-chat-reverse .media-body p {
              float: right;
              clear: right;
              background-color: #48b0f7;
              color: #fff;
          }
          
          .media-chat.media-chat-reverse .media-body p.meta {
              background-color: transparent !important;
              color: #3082d3;
              padding: 0;
              opacity: .8;
          }
            
            
            `
  
  URL =  '/v1/api/';
  urlGet : string
   
  // 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('token-chb')  })
  };          
  constructor(private router: Router, private http : HttpClient) { 
    this.urlGet = environment.Url;
  }

  getLogin(user: string, clave : string) : Observable<IToken>{
    var usuario = {
      "nombre" : user,
      "clave" : clave,
    };
    var url = this.urlGet + 'wusuario/login';
    return this.http.post<IToken>(url, usuario );
  }
  

  //EnviarMensaje Api generales
  EnviarMensaje( xAPI : IAPICore ) : Observable<any>{
    var url = this.URL + "crud"; 
    return this.http.post<any>(url, xAPI, this.httpOptions);
  }

  //Analizar mensajes 
  Analizar(msj : string){
    var contenido = ''
  }

 
  
}
