import { Injectable } from '@angular/core';
import { Dialog } from '@capacitor/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  showPrompt(title:string, message: string): Promise<string> {
    return Dialog.prompt({
      title,
      message
    }).then(result => result.value);
  }
}
