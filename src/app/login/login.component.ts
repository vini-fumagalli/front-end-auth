import { Component } from '@angular/core';
import { LoginUserViewModel } from '../api/loginUserViewModel';
import { ApiService } from '../services/api.service';
import { Resposta } from '../api/resposta';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponseViewModel } from '../api/loginResponseViewModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user:LoginUserViewModel = new LoginUserViewModel()
  
  constructor(
    private apiService:ApiService, 
    private msgService:MessageService,
    private router:Router
    ) { }
  
  async login() {

    (await this.apiService.enviarDados('auth/sign-in', this.user))
    .subscribe(
      {
        next: (res:Resposta) => {
        const data = res.data as LoginResponseViewModel;
        this.msgService.add({ severity:'success', summary:'Sucesso', detail:res.mensagem});
        sessionStorage.setItem('token', data.accessToken);
        sessionStorage.setItem('expiresAt', data.expiresAt.toString());
        sessionStorage.setItem('usuario', data.userToken.email);

        const claims = data.userToken.claims[0]
        if(data.userToken.claims.length > 0 && claims.type !== null && claims.value !== null) {
          sessionStorage.setItem('perfil', claims.type);
          sessionStorage.setItem('permissoes', claims.value);
        }

        this.router.navigate(['/home']);
        },
        error: (fail:HttpErrorResponse) => {
          this.msgService.add({ severity:'error', summary:'Erro', detail:fail.error.mensagem });
        }
      }
    )
  }
  
}
