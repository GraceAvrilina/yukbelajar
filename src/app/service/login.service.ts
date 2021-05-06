import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService{
  // private url = 'http://127.0.0.1/api/product'
  private url = 'https://smartclass.co.id/mobile/api/product'

  constructor(http: HttpClient) { 
    super(http);
  }

//  async userLogin(dataFilter = null) {
//     let result;
//     if (dataFilter) {
//       result = await this.getWithParameter(this.url + 'login.php', dataFilter);
//     } else {
//       result = await this.get(this.url + 'login.php');
//     }

//     return result;
//   }

  async userLogin(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/login.php`,
      param,
    );

    return result;
    
  }
  
 async testGet() {
    let result;
    // if (dataFilter) {
    //   result = await this.getWithParameter(this.url + 'read.php', dataFilter);
    // } else {
      result = await this.get(this.url + '/read.php');
    // }

    return result;
  }
}
