import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataKelasService extends BaseService{
  // private url = 'http://127.0.0.1/api/product'
  private url = 'https://smartclass.co.id/mobile/api/product'

  constructor(http: HttpClient) { 
    super(http);
  }

  async getDataSkl(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/data_skl.php`,
      param,
    );

    return result;
    
  }
  
  async getDataKelas(param : any): Promise<any> {
    // const result = await this.get(
    //   `${this.url}/data_kls.php`,
    //   param,
    // );

    let result;

    result = await this.getWithParameter(this.url+ '/data_kls.php', param);
    return result;
    
  }
    
  async getDataMapel(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/data_mapel.php', param);
    return result;
    
  }
  
  async getDataSiswa(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/data_siswa.php', param);
    return result;
    
  }
  
  async getAbsensi(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/data_absensi.php', param);
    return result;
    
  }
  
  async addAbsensi(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/absensi.php`,
      param,
    );

    return result;
    
  }
  
  async addSpp(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/spp.php`,
      param,
    );

    return result;
    
  }
  
  async kirimPesan(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/pesan.php`,
      param,
    );

    return result;
    
  }

  async kirimTugas(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/tugas.php`,
      param,
    );

    return result;
    
  }

  async editDataSkl(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/edit_dtskl.php`,
      param,
    );

    return result;
    
  }
  
  async delDataKls(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/del_datakls.php`,
      param,
    );

    return result;
    
  }
  
  async delDataMapel(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/del_mapel.php`,
      param,
    );

    return result;
    
  }
  
  async addDataKls(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/edit_datakls.php`,
      param,
    );

    return result;
    
  }
  
  async addDataMapel(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/add_mapel.php`,
      param,
    );

    return result;
    
  }
   
  async exportDataMapel(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/export_mapel.php`,
      param,
    );

    return result;
    
  }
  
  async exportDataSiswa(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/export_siswa.php`,
      param,
    );

    return result;
    
  }
  
  async removeSiswa(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/del_siswa.php`,
      param,
    );

    return result;
    
  }
   
  async editSiswa(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/edit_siswa.php`,
      param,
    );

    return result;
    
  }
  
  async detailSiswa(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/selected_siswa.php', param);
    return result;
    
  }

}
