import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { MenuController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {PasswordService} from '../service/password.service'
import * as firebase from 'firebase';
import 'firebase/auth'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public params: any = {
    username: "",
    password: "",
    // username_new: "",
    password_new: "",
    password_new_confirm: "",
  }
  public folder: string;
  public open = false

  @ViewChild('passwdForm', {static:false}) passwdForm: NgForm
  // @ViewChild('username', {static:false}) username
  // @ViewChild('password', {static:false}) password: NgForm
  constructor(private menu: MenuController,
    private router: Router,
    public toastController: ToastController,
    private psswdService: PasswordService,
    private activatedRoute: ActivatedRoute,) {
      
    let email = localStorage.getItem("email")
    const emAuth= firebase.auth()

    // emAuth.sendPasswordResetEmail(email)
    // .then(() => console.log('sent Password Reset Email!'))
    // .catch((error) => console.log(error))

    
    firebase.auth().signInWithEmailLink(email)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      var userId= userCredential.user.uid;
      console.log(user, userId)
      // user.updatePassword(newPassword).then(function() {
      //   console.log('Update successful.')
      // }).catch(function(error) {
      //   // An error happened.
      // });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      console.log(errorCode)
    });
     }

  ionViewWillEnter(){    
    this.menu.open('first');
    if(this.passwdForm!= undefined)
    this.passwdForm.reset()
  }

  ngOnInit() {
    // var user = firebase.auth().currentUser;
    // console.log(user)
    this.reset()
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.params.username = ''
    if(this.passwdForm!= undefined)
    this.passwdForm.reset()
  }

  async changePswrd(){
    const param = {
      username: this.params.username,
      username_new: this.params.username,
      password: this.params.password,
      password_new: this.params.password_new,
      password_new_confirm: this.params.password_new_confirm
    };

    firebase.auth().signInWithEmailAndPassword(param.username, param.password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      var userId= userCredential.user.uid;
      console.log(user, userId)
      const newPassword = param.password_new_confirm
      user.updatePassword(newPassword).then(function() {
        console.log('Update successful.')
      }).catch(function(error) {
        // An error happened.
      });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // console.log(errorMessage)
    });

    const response = await this.psswdService.changePsswd(param);
    const { isSucces, message} = response;

    if(isSucces){
      this.presentToast(message)
      this.reset()
      this.close()
    }
    else{
      this.presentToast(message)
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  reset(){
    this.params.username = null
    this.params.username_new = null
    this.params.password = null
    this.params.password_new = null
    this.params.password_new_confirm = null
  }

  close() {
    // this.router.navigate(['home'])
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigate(['home'])
      // .then(() => {
      //   window.location.reload();
      // });
  }); 
  }
}
