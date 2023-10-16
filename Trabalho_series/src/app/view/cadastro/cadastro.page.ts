import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Itens } from 'src/app/model/entities/itens/Itens';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { ItensService } from 'src/app/model/services/itens.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  nome! : string;
  lancamento! : number;
  diretor! : string;
  temporadas!: number;
  genero! : number;
  

  constructor(private alertController: AlertController,
    private router : Router, private firebase : FirebaseService){
      
    }
  
  ngOnInit() {

  }

  cadastro(){
    if(this.nome){
      if(this.nome.length >= 3){
        let novo : Itens = new Itens(this.nome);
        novo.lancamento = this.lancamento;
        novo.diretor = this.diretor;
        novo.temporadas = this.temporadas;
        novo.genero = this.genero;
        this.firebase.cadastro(novo)
        .then(() => this.router.navigate(["/home"]))
        .catch((error) => {
          console.log(error);
          this.presentAlert("Erro","erro ao salvar série!");
        })

      }else {
        this.presentAlert("Erro", "Nome precisa de no mínimo 3 caracteres!");
      }
    }else {
      this.presentAlert("Erro", "Nome é um campo obrigatório!");
    }
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
