import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService extends BaseService{
  // private url = 'http://127.0.0.1/api/product'
  private url = 'https://smartclass.co.id/mobile/api/product'

  constructor(http: HttpClient) { 
    super(http);
  }
  
  async changePsswd(param : any): Promise<any> {
    const result = await this.post(
      `${this.url}/change_password.php`,
      param,
    );

    return result;
    
  }
}
