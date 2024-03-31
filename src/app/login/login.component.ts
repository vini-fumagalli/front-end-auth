import { Component } from '@angular/core';
import { LoginUserViewModel } from '../api/loginUserViewModel';
import { ApiService } from '../services/api.service';
import { Resposta } from '../api/resposta';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user:LoginUserViewModel = new LoginUserViewModel()
  
  constructor(
    private apiService:ApiService, 
    private msgService:MessageService
    ) { }
  
  async login() {
    
    // (await this.apiService.enviarDados('auth/sign-in', this.user))
    // .subscribe((res: Resposta) => {
    //   if(res.sucesso) {
    //     this.msgService.add({ severity:'success', summary:'Sucesso', detail:res.mensagem});
    //     sessionStorage.setItem('token', res.data.accessToken);
    //     sessionStorage.setItem('usuario', res.data.userToken.email);
    //   } 
    // }, (fail: HttpErrorResponse) => {
    //     this.msgService.add({ severity:'error', summary:'Erro', detail: fail.error.mensagem});
    //   })

    (await this.apiService.enviarDados('auth/sign-in', this.user))
    .subscribe(
      {
        next: (res:Resposta) => {
        this.msgService.add({ severity:'success', summary:'Sucesso', detail:res.mensagem});
        sessionStorage.setItem('token', res.data.accessToken);
        sessionStorage.setItem('usuario', res.data.userToken.email);
        sessionStorage.setItem('perfil', res.data.userToken.claims[0].type);
        sessionStorage.setItem('permissoes', res.data.userToken.claims[0].value);
        },
        error: (fail:HttpErrorResponse) => {
          this.msgService.add({ severity:'error', summary:'Erro', detail:fail.error.mensagem });
        }
      }
    )
  }
  
}
