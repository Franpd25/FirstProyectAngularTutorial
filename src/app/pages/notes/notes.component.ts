import { Component, ElementRef, OnInit, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { INote } from 'src/app/model/INote';
import { SharedModule } from 'src/app/components/SharedModule';
import { HighlightDirective } from 'src/app/directives/highlight.directive';
import { NotesService } from 'src/app/services/notes.service';
import { FormNoteComponent } from '../../components/form-note/form-note.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule, HighlightDirective, FormNoteComponent],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  public _editingNote!:INote;

  [x: string]: any;
  @ViewChild('colorpicker') cp!:ElementRef;

  public color:string = '#fff';
  public page = 'Inicio'

  public notes:INote[] = [
    {title:'Nota1', description:"Hola Mundo"},
    {title:'Nota2', description:"Hello World"},
  ];

  constructor(public notesS:NotesService) { }

  ngOnInit(): void {
  }

  refresh() {
    location.reload();
  }

  cambiaColor($event:any) {
    //console.log($event.target.value);
    this.color = $event.target.value;
  }

  public removingNote($event:INote) {
    console.log("Eliminando Nota");
    //console.log($event);
    this.notesS.removeNote($event.id);
  }
  public editingNote($event:INote) {
    console.log("Editando Nota");
    //console.log($event);
    this._editingNote=$event;
    console.log(this._editingNote);
    document.getElementById("launchModal")?.click();
  }
  trackByNotes(index:number, item:INote) {
    return item.id;
  }
  updateNote($event:any){
    console.log($event);
    this.notesS.updateNote($event); //<-new
    document.getElementById("closeModal")?.click();
  }
}
