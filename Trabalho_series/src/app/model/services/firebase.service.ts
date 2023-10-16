import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Itens } from '../entities/itens/Itens';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string ="series";

  constructor(private firestore:AngularFirestore) { }

  buscarTodos(){
    return this.firestore.collection(this.PATH).snapshotChanges();
  }
  cadastro(itens:Itens){
    return this.firestore.collection(this.PATH)
    .add({nome : itens.nome,
      lancamento: itens.lancamento,
      diretor: itens.diretor,
      temporadas: itens.temporadas,
      genero: itens.genero,
    })
  }
  editar(itens : Itens, id:string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome : itens.nome,
      lancamento: itens.lancamento,
      diretor: itens.diretor,
      temporadas: itens.temporadas,
      genero: itens.genero,
      })
  }
  excluir(tipo : string){
    return this.firestore.collection(this.PATH)
    .doc(tipo).delete();
  }
}
