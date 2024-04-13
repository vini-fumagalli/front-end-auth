import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MessageService } from 'primeng/api';
import { createClaimViewModel } from '../api/createClaimViewModel';
import { Resposta } from '../api/resposta';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private apiService:ApiService, 
    private msgService:MessageService
  ) { }

  addClaimVm = new createClaimViewModel();
  isAdm: boolean = false;

  ngOnInit(): void {
    const adm = sessionStorage.getItem('perfil');
    if(adm == 'Administrador') {
      this.isAdm = true;
    }
  }

  async addClaim() {
    this.addClaimVm.user = sessionStorage.getItem('usuario');
    this.addClaimVm.type = 'Administrador';
    this.addClaimVm.value = '';

    (await this.apiService.enviarDados('auth/add-claim', this.addClaimVm))
    .subscribe(
      {
        next: (res:Resposta) => {
          sessionStorage.setItem('token', res.data.accessToken);
          sessionStorage.setItem('expiresAt', res.data.expiresAt);
          sessionStorage.setItem('usuario', res.data.userToken.email);

          if(res.data.userToken.claims.length > 0) {
            sessionStorage.setItem('perfil', res.data.userToken.claims[0].type);
            sessionStorage.setItem('permissoes', res.data.userToken.claims[0].value);
          }
          this.msgService.add({ severity:'success', summary:'Sucesso', detail:'Admnistrador adicionado com sucesso' });
          setTimeout(() => {
            window.location.reload();
          }, 900)
        },
        error: (fail:HttpErrorResponse) => {
          this.msgService.add({ severity:'error', summary:'Erro', detail:'Falha ao tentar cadastrar Admnistrador' });
        }

      }
    )
  }

  async saudacao() {

    (await this.apiService.receberDados('auth/saudacao')) 
    .subscribe(
      {
        next: () => {
          this.msgService.add({ severity:'success', summary:'Sucesso', detail: 'Bem-Vindo, novo Administrador' });
        },
        error: () => {
          this.msgService.add({ severity:'error', summary:'Erro', detail: 'Você não tem permissão para isso' });
        }
      });
  }
}
