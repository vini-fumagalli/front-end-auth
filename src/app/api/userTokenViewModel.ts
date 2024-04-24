import { ClaimViewModel } from "./claimViewModel";

export class UserTokenViewModel {
    id:string = '';
    email:string = '';
    claims:ClaimViewModel[] = [];
}