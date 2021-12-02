import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DataKelasService} from '../../service/data-kelas.service'
import { LoadingController,ToastController, AlertController} from "@ionic/angular";
// import { FormBuilder, FormGroup } from  '@angular/forms';

@Component({
  selector: 'app-upload-tugas',
  templateUrl: './upload-tugas.component.html',
  styleUrls: ['./upload-tugas.component.scss'],
})
export class UploadTugasComponent implements OnInit {
 
  public data:any = {
    id:'',
    nis:'',
    komen:'',
    myfile:['']
  }
  
  public eventFile: any
  public file: any = null
  public previmg: string = ''
  // form: FormGroup;
  constructor(
    private router:Router,
    // private formBuilder: FormBuilder,
    private _Activatedroute:ActivatedRoute,
    private toastController: ToastController,
    private dataKelasService : DataKelasService) {
      this.data.id=this._Activatedroute.snapshot.paramMap.get("id"); 
      this.data.nis=localStorage.getItem("induk")
    }

  ngOnInit() {
    // this.form = this.formBuilder.group({
    //   id:'',
    //   nis:'',
    //   komen:'',
    //   myfile:['']
    // })
  }

  // onFileSelect(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.form.get('myfile').setValue(file);
  //   }
  // }
  
  readUrl(event) {
    if (event != undefined) {
      let t_files = event.target.files
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader()
        reader.onload = event => {
          this.eventFile = event
          let local_file = this.eventFile.target.result

          /* preview img */
          let img_src = local_file
          this.previmg = img_src
          let file_img = t_files[0]
          this.file = file_img
        }
        reader.readAsDataURL(t_files[0])
      }
    }
  }
  async onSubmit() {
    const formData = new FormData();
    // let formData: FormData = new FormData()
    // this.form.id = 
    formData.append('id', this.data.id)
    formData.append('nis', this.data.nis)
    formData.append('komen', this.data.komen)
    formData.append('myfile', this.file);

    
    const response = await this.dataKelasService.uploadTugas(formData)
    const { isSuccess, result, data } = response

    if(result.isSuccess){
    // this.missLoading()
        // this.dataSekolah = data[0].namaSkl
        console.log("success")
        this.presentToast('Berhasil upload tugas')
    }
    else{
        console.log("failed")
        this.presentToast('Gagal upload tugas')
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  // onFileChanged(event) {
  //   this.selectedFile = event.target.files[0];
  //   const fileReader:any = new FileReader();

  //   // fileReader.onload = () => {
      
  //   //  console.log(fileReader.result);
  //   // }
    
  //   var self = this
  //   fileReader.onload = function (fre: FileReaderEvent) {
  //         self.myfile.media[0] = fileReader.result
  //         // self.myfile.media[0] = JSON.parse(fre.target.result)
  //   }

  //   fileReader.readAsText(this.selectedFile, "UTF-8");
  //   fileReader.readAsDataURL(this.selectedFile)
  //   console.log(this.myfile)
  //   console.log(fileReader.readAsDataURL(this.selectedFile))
  //   console.log(JSON.parse(fileReader.result))
  //   fileReader.onerror = (error) => {
  //     console.log(error);
  //   }
  // }
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
