import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular'
import { Router } from '@angular/router'
import * as firebase from 'firebase';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent implements OnInit {
  public position
  public nama
  public appPages = [
   {
     title: 'Ubah Password',
     url: '/change-password',
     icon: 'lock-closed'
   },
  //  {
  //    title: 'Absensi Siswa',
  //    url: '/absensi-siswa',
  //    icon: 'document-text'
  //  },
  //  {
  //    title: 'Pesan Siswa',
  //    url: '/pesan-siswa',
  //    icon: 'document-text'
  //  }, 
  //  {
  //    title: 'Entry Tugas',
  //    url: '/kirim-tugas',
  //    icon: 'document-text'
  //  },  
  //  {
  //    title: 'Data Mapel',
  //    url: '/data-mapel',
  //    icon: 'document-text'
  //  },   
  ]


  public KS = [
    {
      title: 'Ubah Password',
      url: '/change-password',
      icon: 'lock-closed'
    },
    {
      title: 'Pesan Siswa',
      url: '/pesan-siswa',
      icon: 'document-text'
    } 
   ]

   
  public admin_skl = [
    {
      title: 'Ubah Password',
      url: '/change-password',
      icon: 'lock-closed'
    },
    {
      title: 'Data Kelas',
      url: '/data-kelas',
      icon: 'document-text'
    },
    {
      title: 'Data Siswa',
      url: '/data-siswa',
      icon: 'document-text'
    },
    {
      title: 'Data Guru',
      url: '/data-guru',
      icon: 'document-text'
    },
    {
      title: 'Data Mata Pelajaran',
      url: '/data-mapel',
      icon: 'document-text'
    },
    // {
    //   title: 'Setup Autoinfo',
    //   url: '/setup-info',
    //   icon: 'document-text'
    // },
    {
      title: 'Pembayaran & Absensi',
      url: '/absensi-siswa',
      icon: 'document-text'
    },
    {
      title: 'Pesan Siswa',
      url: '/pesan-siswa',
      icon: 'document-text'
    }
   ]
  
   public admin = [
    {
      title: 'Ubah Password',
      url: '/change-password',
      icon: 'lock-closed'
    },
    {
      title: 'Data Kelas',
      url: '/data-kelas',
      icon: 'document-text'
    },
    {
      title: 'Data Siswa',
      url: '/data-siswa',
      icon: 'document-text'
    },
    {
      title: 'Data Guru',
      url: '/data-guru',
      icon: 'document-text'
    },
    {
      title: 'Data Staff',
      url: '/data-staff',
      icon: 'document-text'
    },
    {
      title: 'Data Mata Pelajaran',
      url: '/data-mapel',
      icon: 'document-text'
    },
    // {
    //   title: 'Setup Autoinfo',
    //   url: '/setup-info',
    //   icon: 'document-text'
    // },
    // {
    //   title: 'Pembayaran & Absensi',
    //   url: '/absensi-siswa',
    //   icon: 'document-text'
    // },
    // {
    //   title: 'Pesan Siswa',
    //   url: '/pesan-siswa',
    //   icon: 'document-text'
    // }
   ]
   
   public siswa = [
    {
      title: 'Ubah Password',
      url: '/change-password',
      icon: 'lock-closed'
    },
    {
      title: 'Tugas',
      url: '/list-tugas',
      icon: 'document-text'
    },
    {
      title: 'Belajar Online',
      url: '/belajar-online',
      icon: 'document-text'
    },
    {
      title: 'Ujian Online',
      url: '/list-ujian',
      icon: 'document-text'
    },
    {
      title: 'Info Sekolah',
      url: '/info-sekolah',
      icon: 'document-text'
    },
    {
      title: 'Info Penilaian Sikap',
      url: '/nilai-sikap',
      icon: 'document-text'
    },
    {
      title: 'Info PAS',
      url: '/hasil-pas',
      icon: 'document-text'
    },
    {
      title: 'Info PTS',
      url: '/hasil-pts',
      icon: 'document-text'
    },
    // {
    //   title: 'Chat Walikelas',
    //   url: 'https://smartclass.co.id/chatwk/',
    //   icon: 'chatbubbles'
    // },
    // {
    //   title: 'Chat Dokter',
    //   url: 'https://smartclass.co.id/chat/',
    //   icon: 'chatbox'
    // }
  ]
  
  public open = false

  constructor(
    private menu: MenuController,
    private alertController: AlertController,
    private router: Router,) { }

  ionViewWillEnter(){
    this.menu.open('end');
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
    this.open = true
  }

  closeFirst() {
    this.menu.enable(true, 'first')
    this.menu.close('first')
    this.open = false
  }
  
  navigate(url) {
    if (url == '/logout') {
      this.confirmSignOut()
    } else {
      this.router.navigateByUrl(url)
    }
  }

  nav(url) {
    if (url == '/beranda') {
      this.router.navigate(['/home'])
      this.router.onSameUrlNavigation = "reload"
      this.menu.enable(true, 'first')
      this.menu.close('first')
      this.open = false
    } 
    else{
      this.router.navigate([url])
      this.router.onSameUrlNavigation = "reload"
      this.menu.enable(true, 'first')
      this.menu.close('first')
      this.open = false      
    }
  }

  ngOnInit() {
    this.position = localStorage.getItem("position")
    this.nama = localStorage.getItem("name")
    
    // firebase.database().ref('Users/').orderByChild('kodeSekolah').equalTo('5115').once('value', snapshot => {
    //   if (snapshot.exists()) {
    //     let rooms = [];
    //     let data:any[]=[]
    //     rooms = snapshotToArray(snapshot);
    //     // console.log(rooms)
        
    //     rooms.forEach(val => {
    //       if(val.kelas=='10IPS1' && val.level=='SISWA'){
    //         data.push(val)
    //       }
    //     });

    //     data.forEach(val => {                 
    //       let pass = val.nama.replace(/\s/g, "").substr(0,4).toLowerCase() + val.nis
    //       console.log(pass) 
          
    //       firebase.auth().signInWithEmailAndPassword(val.email, pass)
    //       .then((userCredential) => {
    //         // Signed in
    //         var user = userCredential.user.email;
    //         var userId= userCredential.user.uid;
    //         console.log(user, userId)
            
    //         if(val.email == user){
              
    //           const tes = firebase.database().ref('Users/' + val.key);
    //           tes.update({id: userId});
    //           // console.log(data)
    //         }
    //       })
    //       .catch((error) => {
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         console.log(errorMessage)
    //       });
          
    //       // firebase.auth().signOut().then(() => {
    //       //   console.log("Sign-out successful.")
    //       // }).catch((error) => {
    //       //   // An error happened.
    //       // });
    //     });
    //   } 
    // });
  }

  
  async confirmSignOut() {
    const alert = await this.alertController.create({
      header: '',
      message: 'Apakah anda ingin keluar?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {}
        },
        {
          text: 'Ya',
          handler: () => {
            localStorage.clear()
            // this.storageService.clearStorage(() => {
              this.router.navigateByUrl('/')
              .then(() => {
                window.location.reload();
              });
            // })
          }
        }
      ]
    })

    await alert.present()
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