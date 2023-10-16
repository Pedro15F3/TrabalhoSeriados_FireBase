import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Itens } from 'src/app/model/entities/itens/Itens';
import { FirebaseService } from 'src/app/model/services/firebase.service';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  nome! : string;
  lancamento! : number;
  temporadas! : number;
  diretor! : string;
  genero! : number;
  item! : Itens;
  edicao: boolean = true;

  constructor(private firebase : FirebaseService, private router : Router, private alertController: AlertController) {

  }

  ngOnInit() {
    this.item = history.state.item;
    this.nome = this.item.nome;
    this.lancamento = this.item.lancamento;
    this.temporadas = this.item.temporadas;
    this.diretor = this.item.diretor;
    this.genero = this.item.genero;

    }

  habilitar(){
    if (this.edicao){
      this.edicao = false;
    }else {
      this.edicao = true;
    }
  }

  editar(){
    if (this.nome){
      let novo: Itens = new Itens(this.nome);
      novo.lancamento = this.lancamento;
      novo.temporadas = this.temporadas;
      novo.diretor = this.diretor;
      novo.genero = this.genero;
      this.firebase.editar(novo, this.item.tipo)
      .then(() =>{this.router.navigate(["/home"]);})
      .catch((error)=>{
        console.log(error);
        this.presentAlert("Erro","Erro ao atualizar série!")
      })
      
    }else {
      this.presentAlert("Erro", "Nome é um campo obrigatório!");
    }
  }

  excluir(){
    this.presentConfirmAlert("ATENÇÃO", "Deseja realmente excluir a Serie?")
  }

  excluirItem(){
    this.firebase.excluir(this.item.tipo)
    .then(() => {this.router.navigate(["/home"]);})
    .catch((error) =>{
      console.log(error);
      this.presentAlert("Erro","Erro ao excluir série!")
    })
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Lista de Series',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentConfirmAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Lista de Series',
      subHeader: subHeader,
      message: message,
      buttons: [
        {text: 'Cancelar', role: 'cancelar', handler: ()=>{console.log("cancelou")}},
        {text: 'Confirmar', role: 'confirmar', handler: (acao)=>{this.excluirItem()}},
      ],
    });
    await alert.present();
  }

}
