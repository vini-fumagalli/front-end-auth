import { UserTokenViewModel } from "./userTokenViewModel";

export class LoginResponseViewModel {
    accessToken:string = '';
    expiresAt!: Date;
    userToken: UserTokenViewModel = new UserTokenViewModel;
}