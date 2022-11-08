import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { INote } from 'src/app/model/INote';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-form-note',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css']
})
export class FormNoteComponent implements OnInit {

  @Input() note!: INote;
  @Output() onsubmit = new EventEmitter<INote>();
  public form:FormGroup;
  /*@ViewChild('title') title!: ElementRef;
  public description!:string;*/
  //@ViewChild('description') description!: ElementRef;

  constructor(private fb:FormBuilder/*private noteS:NotesService*/) { 
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: [''],
      id: ['']
    })
  }

  ngOnInit(): void {
    if (this.note && this.note.title) {
      this.form.setValue(this.note);
      //formControlName1: myValue1, formControlName2: myValue2

      /*this.form.patchValue({
        id: this.note.id,
        // formControlName2: myValue2 (can be omitted)
      });*/
    }
  }

  ngOnChanges($changes:any) {
    console.log($changes)
    if($changes.note && $changes.note.currentValue){
      this.form.setValue($changes.note.currentValue);
    }
  }

  submit() {
    /*console.log("Guardando nota");
      (this.title.nativeElement as HTMLInputElement).value
      this.description*/
    //console.log(this.form);
    
    //VALID
    let newNote:INote = {
      id:this.form.value.id,// <<-- new
      title: this.form.value.title,
      description: this.form.value.description
      //title: this.form.value.title,
      //description: this.form.value.description
    }
    //this.noteS.createNote(newNote);
    this.onsubmit.emit(newNote);
    //this.form.reset();
  }
}
