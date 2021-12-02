import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataKelasService extends BaseService{
  // private url = 'http://192.168.0.106/api/product'
  // private url = 'http://127.0.0.1/api/product'
  private url = 'https://smartclass.co.id/mobile/api/product'
  private beranda = 'https://smartclass.co.id'

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
  
  async getDetailMapel(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/belon.php', param);
    return result;
    
  }
  
  async getDetailMateri(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/detail_belon.php', param);
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
  
  async exportDataGuru(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/export_guru.php`,
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
  
  async getListUjian(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/list_ujian.php', param);
    return result;
    
  } 
   
  async getUjian(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/getUjian.php', param);
    return result;
    
  } 
   
  async getUjianDone(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/getUjianDone.php', param);
    return result;
    
  } 

  async startUjian(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/acaksoal.php`,
      param,
    );

    return result;
    
  }
  
  async jwbSoal(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/jwbanx.php`,
      param,
    );

    return result;    
  }
    
  async done(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/done.php`,
      param,
    );

    return result;    
  }

  async getScore(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/score.php', param);
    return result;
    
  } 
  
  async getGuru(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/data_guru.php', param);
    return result;
    
  }   
  async listTugas(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/info_tugas.php', param);
    return result;
    
  } 
  
  async getAbsen(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/cek_absen.php', param);
    return result;
    
  } 

  async Absen(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/abs_siswa.php`,
      param,
    );

    return result;    
  }

  async uploadTugas(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/upload_tugas.php`,
      param,
    );

    return result;    
  }
  
  async recordBelon(param : any): Promise<any> {
    const result = await this.post(
      `${this.beranda}/e_learn.php`,
      param,
    );

    return result;    
  }
  
  async infoSekolah(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/infosekolah.php', param);
    return result;
    
  } 
  
  async infoQuiz(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/infoquiz.php', param);
    return result;
    
  } 
  
  async infoUas(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/infouas.php', param);
    return result;
    
  } 
  
  async infoUts(param : any): Promise<any> {
    let result;

    result = await this.getWithParameter(this.url+ '/infouts.php', param);
    return result;
    
  } 
}
