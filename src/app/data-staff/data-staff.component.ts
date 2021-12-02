import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-data-staff',
  templateUrl: './data-staff.component.html',
  styleUrls: ['./data-staff.component.scss'],
})
export class DataStaffComponent implements OnInit {
datanya:any[]=[]
  constructor() { }

  ngOnInit() {
    
  firebase.database().ref('Users/').once('value', (resp: any) => {
    let data = [];
    data = snapshotToArray(resp);
    data.forEach(val => {
      if(val.level == 'GURU' && val.kodeSekolah== '5115'){
        this.datanya.push(val)
      }
      
      if(val.level == 'WALIKELAS' && val.kodeSekolah== '5115'){
        this.datanya.push(val)
      }

    });
    // this.datanya.forEach(val => {         
    //   const tes = firebase.database().ref('Users/' + val.key);
    //   // tes.update({message: 'yahoo'});
    //   tes.remove()
    // });
    // this.presentToast("Data Terhapus")
  });
  
  console.log(this.datanya)
  }

}

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};