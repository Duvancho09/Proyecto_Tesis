import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AskService {

  private askData = [
    { question: '¿Cómo crear un NFT?', answer: 'Primero debes conectar tu wallet para el momento de que te vayan a comprar ya tengas conectado el wallet, luego debes dirigirte al botón que se encuentra en la parte superior de la pantalla que dice colecciones y darle click y darle donde dice Crear NFT'},
    { question: '¿Cómo puedo conectar mi wallet?', answer: 'Debes irte a la parte superior derecha y encontraras el botón que dice: Conectar mi Wallet, al momento de darle click te enviara a la página correspondiente y solo deberas seguir los pasos'},
    { question: '¿Que es un NFT?', answer: 'Un NFT es un token no fungible'},
    { question: '¿Cómo vendo mis NFTs?', answer: 'Sigue estos pasos'},
    { question: '¿Qué wallets son compatibles?', answer: 'Master Card, VISA, Codensa'},
    { question: '¿Puedo eliminar un NFT?', answer: 'Si, tu eres el que crea, vende, modifica y eliminas tus propios NFTs'},
  ];

  getAsk(){
    return this.askData;
  }

  constructor() { }

}
