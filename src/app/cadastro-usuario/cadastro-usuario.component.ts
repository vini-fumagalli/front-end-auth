import { Component } from '@angular/core';
import { RegisterUserViewModel } from '../api/registerUserViewModel';
import { ApiService } from '../services/api.service';
import { Resposta } from '../api/resposta';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss'
})

export class CadastroUsuarioComponent {
  newUser = new RegisterUserViewModel();

  constructor(
      private apiService:ApiService, 
      private msgService: MessageService
      ) { }

  async register() {

    if(this.newUser.password !== this.newUser.confirmPassword) {
      return this.msgService.add({ severity:'error', summary:'Erro', detail:'Senhas não conferem' });
    }

    (await this.apiService.enviarDados('auth/sign-up', this.newUser)).subscribe((res:Resposta) => {
      if(res.sucesso) {
        this.msgService.add({ severity:'success', summary:'Sucesso', detail:res.mensagem });
        sessionStorage.setItem('token', res.data.accessToken);
        sessionStorage.setItem('usuario', res.data.userToken.email);
      }
    });
  }
}
