import { Component } from '@angular/core';
import { INote } from './model/INote';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FirstProjectTutorial';

  /*public removingNote($event:INote) {
    console.log("Eliminando Nota");
    console.log($event);
  }
  public editingNote($event:INote) {
    console.log("Editando Nota");
    console.log($event);
  }*/
  
  public alerta(){
    alert("Alerta Roja");
  }
}
