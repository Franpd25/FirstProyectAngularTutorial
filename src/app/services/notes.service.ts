import { Injectable } from '@angular/core';
import { INote } from '../model/INote';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private dbPath = '/notes';
  notesRef!: AngularFirestoreCollection<any>;

  public notes:INote[] = [
    //{id:1,title:'Nota1',description:"Hola Mundo"},
    //{id:2,title:'Nota2',description:"Hello World"},
  ];
  constructor(private db: AngularFirestore, private user: LoginService) { 
    this.notesRef = db.collection(user.user.id);

    //Cargar todas las notas del servidor
    this.notesRef.get().subscribe(d => {
      //console.log(d);
      let docs = d.docs;
      /*docs.forEach(d => {
        //console.log(d.id); console.log(d.data());
        let newd = {id:d.id,...d.data()}; //id:3894723897, title:'hola', description: '...'
        this.notes.push(newd)
      });*/
      this.notes = docs.map(d => {
        return {id:d.id,...d.data()};
      });
    })
  }

  public async createNote(newNote:INote){
    /**
     * Base de datos -> creará clave primary ó id
     */
    //let id = Math.floor(Math.random()*1000) + 1;
    
    /**
     * Conectar a firebase
     */
    try {
      let {id, ...newNoteWithoutID} = newNote;
      let dRef: DocumentReference<any> = await this.notesRef.add({...newNoteWithoutID});
        newNote.id = dRef.id;
        this.notes.push(newNote);
    } catch (err) {
      console.error(err);
    }
  }

  public createNoteWithKey(key:string, newNote:INote) {
    return this.notesRef.doc(key).set(newNote, {merge: true}); //merge ->
  }

  public removeNote(id:any): Promise<void> {
    let newNotes = this.notes.filter((n)=>{
      return n.id!=id;
    });
    this.notes = newNotes;
    return this.notesRef.doc(id).delete();
  }

  public getNotes():INote[]{
    return this.notes;
  }

  public updateNote(note:INote): Promise<void> {
    let idtobeupdated:any;
    let data:any;
    //let n= this.notes.map(n=>{ if(n.id == note.id){ n.title=note.title; n.description=note.description; } return n; })
    this.notes.forEach(n=>{
      if(n.id==note.id) {
        n.title=note.title;
        n.description=note.description;
        let {id,...newData} = note;
        idtobeupdated=id;
        data=newData;
      }
    });
    if(idtobeupdated) {
      return this.notesRef.doc(idtobeupdated as string).update(data);
    }else {
      return Promise.resolve();
    }
  }

  public customQuery(){
    const q = this.notesRef.ref.where("title","==","Hello").get()
    .then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
    }).catch((error) => {
      console.log("Error getting documents: ", error);
  });

  }
}
