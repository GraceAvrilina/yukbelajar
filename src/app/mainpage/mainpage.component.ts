import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular'
import { Router } from '@angular/router'

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
   {
     title: 'Absensi Siswa',
     url: '/absensi-siswa',
     icon: 'document-text'
   },
   {
     title: 'Pesan Siswa',
     url: '/pesan-siswa',
     icon: 'document-text'
   }, 
   {
     title: 'Entry Tugas',
     url: '/kirim-tugas',
     icon: 'document-text'
   },  
   {
     title: 'Data Mapel',
     url: '/data-mapel',
     icon: 'document-text'
   },   
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
    // {
    //   title: 'Data Staff',
    //   url: '/data-staff',
    //   icon: 'document-text'
    // },
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
            // })
          }
        }
      ]
    })

    await alert.present()
  }

}
