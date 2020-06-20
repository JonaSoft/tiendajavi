import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  usuarioemail:string;
  constructor(private email:AuthService) { }

  ngOnInit() {
    //this.usuarioemail = this.email.leerEmail()
  }

}
