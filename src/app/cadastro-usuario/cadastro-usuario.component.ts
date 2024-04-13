import { Component } from '@angular/core';
import { RegisterUserViewModel } from '../api/registerUserViewModel';
import { ApiService } from '../services/api.service';
import { Resposta } from '../api/resposta';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { CodAutViewModel } from '../api/codAutViewModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss'
})

export class CadastroUsuarioComponent {

  newUser = new RegisterUserViewModel();
  codAutVm = new CodAutViewModel();
  showFormCodAut:boolean = false;
  showFormSignUp:boolean = true;

  constructor(
      private apiService:ApiService, 
      private msgService: MessageService,
      private router:Router
      ) { }

  async register() {

    if(this.newUser.password !== this.newUser.confirmPassword) {
      return this.msgService.add({ severity:'error', summary:'Erro', detail:'Senhas não conferem' });
    }

    if(!this.senhaValida(this.newUser.password)) {
      return this.msgService.add({ severity:'error', summary:'Erro', detail:'Senha precisa ter pelo menos 6 caracteres com ao menos 1 letra e 1 número' });
    }

    (await this.apiService.enviarDados('auth/sign-up', this.newUser))
    .subscribe(
      {
        next: (res:Resposta) => {
          this.msgService.add({ severity:'success', summary:'Sucesso', detail:res.mensagem });
          this.showFormSignUp = false;
          this.showFormCodAut = true;
        },
        error: (fail:HttpErrorResponse) => {
          if(fail.status === 409) {
            return this.msgService.add({ severity: 'error', summary: 'Erro', detail: fail.error });
          }
          this.msgService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao enviar o email. Por favor tente novamente' });
        }
      }
    )
  }

  async codAut() {
    if(this.codAutVm.codAut.length !== 6) {
      this.msgService.add({ severity: 'error', summary: 'Erro', detail:'Código inválido'})
    }

    this.codAutVm.email = this.newUser.email;
    this.codAutVm.password = this.newUser.password;

    (await this.apiService.enviarDados('auth/cod-aut', this.codAutVm))
    .subscribe(
      {
        next: (res:Resposta) => {
          this.msgService.add({severity:'success', summary: 'Sucesso', detail:res.mensagem});
          sessionStorage.setItem('token', res.data.accessToken);
          sessionStorage.setItem('expiresAt', res.data.expiresAt);
          sessionStorage.setItem('usuario', res.data.userToken.email);
          this.router.navigate(['/home'])
        },
        error: (fail:HttpErrorResponse) => {
          this.msgService.add({ severity: 'error', summary: 'Erro', detail: fail.error });
        }
      }
    )

  }

  senhaValida(password:string) {
    const regex = /^(?=.*[a-z])(?=.*\d).{6,}$/;
    return regex.test(password);
  }
} 
