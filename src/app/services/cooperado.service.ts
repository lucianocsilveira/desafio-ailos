import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { UserCooperated } from '../objects/users';


@Injectable({
  providedIn: 'root'
})
export class CooperadoService {
  private _Url = 'http://localhost:4200/assets/json/users.json';
  constructor( private http: HttpClient) { }

  cpfConsult(cpf: string){
    return this.http.get<UserCooperated[]>(this._Url)
    .pipe(
      map((response: UserCooperated[]) => {
        return response.find(user => user.cpf === cpf.toString())
      })
    )
  }
}
