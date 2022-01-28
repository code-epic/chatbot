import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { ChatbotService, IAPICore, IToken } from 'src/app/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  mensaje : string
  
  HtmlContenido : string

  Contenido : string

  @ViewChild('panel', { read: ElementRef }) public panel: ElementRef<any>;

  ancho : number

  public xAPI : IAPICore = {
    funcion: '',
    parametros: '',
    relacional: false,
    concurrencia : false,
    protocolo: '',
    ruta : '',
    version: '',
    retorna : false,
    migrar : false,
    modulo : '',
    coleccion : '',
    http : 0,
    https : 0,
    consumidores : '',
    puertohttp : 0,
    puertohttps : 0,
    driver : '',
    query : '',
    metodo : '',
    tipo : '',
    prioridad : '',
    entorno: '',
    logs : false,
    cache: 0,
    estatus: false
  }


  public itk: IToken

  public intentos = 0

  constructor(private cbS : ChatbotService) { 
    this.ancho = 300
    
   

  }


   async iniciarSesion(){
    sessionStorage.removeItem("token-chb")
    await this.cbS.getLogin("CH001", "za7896321").subscribe(
      (data) => {            
        this.itk = data
        sessionStorage.setItem("token-chb", this.itk.token );
        document.getElementById("chat-content").innerHTML = `<style>${this.cbS.style}</style>` + this.Bienvenida()
        console.info("Iniciando Session")
      },
      (error) => { console.log(error) }
    )  
   }

  
  ngOnInit(): void {
    this.iniciarSesion()
    
  }

  //enviarMensaje Es el mensaje que se envia al servidor del chatbot
  enviarMensaje(cadena : string) : string {
    const hoy = new Date()
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()
    return ` <div class="media media-chat media-chat-reverse">
    <div class="media-body">
        <p>${cadena}</p>
        <p class="meta"><time datetime="2018">${hora}</time></p>
      </div>
    </div>`
  }

  //recibirMensaje Mensaje que se envia al usuario en forma de constestacion
  recibirMensaje(cadena : string) : string {
    const hoy = new Date()
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()

    return ` <div class="media media-chat"> <img class="avatar" src="./assets/img/icons/ipostelito.png" alt="...">
    <div class="media-body">
        <p>${cadena}</p>
        <p class="meta"><time datetime="2018">${hora}</time></p>
    </div>
    </div>`
  }

  //Bienvenida establece el pimer mensaje para saludar a los clientes
  Bienvenida(): string{
    const hoy = new Date()
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()

    return `
      <div class="media media-chat"> <img class="avatar" src="./assets/img/icons/ipostelito.png" alt="...">
          <div class="media-body">
              <p>Bienvenido a tu asistente virtual
              </p>
              <p class="meta"><time datetime="2018">${hora}</time></p>
          </div>
      </div>
  `
  }


  //Enviar un mensaje de texto
  Enviar(){
    
    if (this.mensaje != "" ) {
      document.getElementById("chat-content").innerHTML +=  this.enviarMensaje(this.mensaje)    
      this.IrAlFinal()
      this.Preguntar()
    }
  }

  //Preguntar realiza el envio de mensajes y pregunta si falla la conexion
  Preguntar(){
    this.xAPI.funcion = "ChatBot";
    this.xAPI.parametros = this.mensaje;

    this.mensaje = ''
    this.cbS.EnviarMensaje(this.xAPI, this.itk.token).subscribe(
      (data) => {

        this.intentos = 0
        var Chat = data[0]
        document.getElementById("chat-content").innerHTML += this.recibirMensaje( Chat.resp )   
        this.IrAlFinal()
      },
      (error) => { 
        if (this.intentos > 0) {
          var err = error.error;
          if(err.tipo == 2) {
            this.iniciarSesion()           
            this.intentos++
          }else{
            console.info ("Fallo el acceso ", err)
          }
          return false
        }
        this.iniciarSesion()
        this.Preguntar()
        this.intentos++
      }
    )  
  }

  //Enter permite evaluar la tecla en la caja de envio del mensaje
  Enter(e : any) {
    if ( e.keyCode == 13 ) this.Enviar()
  }

  //IrAlFinal mueve el cursor de la caja de mensaje hacia el final de los mensajes
  IrAlFinal(){
    this.ancho += 100
    this.panel.nativeElement.scrollTop = this.ancho
  }
}
