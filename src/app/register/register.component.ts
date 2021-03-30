import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  repasswordType: string = 'password';
  repasswordIcon: string = 'eye-off';
  constructor(private router:Router) { }

  ngOnInit() {
  }

  hideShowPassword(type) {
    if(type == 'psswd'){
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }
    else{
    this.repasswordType = this.repasswordType === 'text' ? 'password' : 'text';
    this.repasswordIcon = this.repasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }
}

  close(){
    this.router.navigate(['login'])
  }
}
