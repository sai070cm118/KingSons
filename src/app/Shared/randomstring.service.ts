import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomstringService {

  public characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  public charactersLength = this.characters.length;
  constructor() { }

  randomString(length) {
    let result           = '';

    for ( let i = 0; i < length; i++ ) {
       result += this.characters.charAt(Math.floor(Math.random() * this.charactersLength));
    }
    return result;
 }

}
