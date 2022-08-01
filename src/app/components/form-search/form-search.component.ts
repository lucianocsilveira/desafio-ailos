import { Component, OnInit } from '@angular/core';
import { CooperadoService } from 'src/app/services/cooperado.service';
import { MatSnackBar } from '@angular/material';
import { UserCooperated } from 'src/app/objects/users';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent implements OnInit {
  cpfValue: string;
  userCooperated: UserCooperated;
  showResult: boolean = false;
  public mask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'-',/\d/,/\d/];

  constructor(
    private cooperadoService: CooperadoService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
  }

  search(){
    if(this.validateCPF(this.cpfValue)){
      const cpfOnlynumber = Utils.onlyNumber(this.cpfValue);

      this.cooperadoService.cpfConsult(cpfOnlynumber).subscribe(response =>{
        if(response){
          this.userCooperated = response;
          this.showResult = true;
        }else{
          this.showMessage('CPF não encontrado.');
        }


      })
    }else{
      this.showMessage('Digite um CPF Válido')
    }
  }

  showMessage(msg: string){
    this.snackBar.open(msg, '', {
      duration: 3000
    });
  }

  validateCPF(cpfValue: string){
    return Utils.validateCPF(cpfValue);
  }

}
