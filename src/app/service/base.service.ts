import { HttpClient } from '@angular/common/http';

export class BaseService {
  constructor(public client: HttpClient) { }

  // protected saveServerIdenity(serverName: string, serverPort: string, username: string): void {
  //   localStorage.setItem(LocalStorageConst.ServerName, serverName);
  //   localStorage.setItem(LocalStorageConst.ServerPort, serverPort);
  //   localStorage.setItem(LocalStorageConst.Username, username);
  // }

  // public getServerIdentity(): any {
  //   return {
  //     serverName: localStorage.getItem(LocalStorageConst.ServerName),
  //     serverPort: localStorage.getItem(LocalStorageConst.ServerPort),
  //     username: localStorage.getItem(LocalStorageConst.Username)
  //   };
  // }

  protected async get(url: string): Promise<any> {
    let result = null;

    await this.client
      .get(encodeURI(url))
      .toPromise()
      .then(response => {
        result = response;
      }).catch(err => {
        result = { error: err as Response };
      });

    return result;
  }

  protected async getWithParameter(url: string, parameter: any): Promise<any> {
    let result = null;

    await this.client
      .get(encodeURI(url), { params: parameter })
      .toPromise()
      .then(response => {
        result = response;
      }).catch(err => {
        result = { error: err as Response };
      });

    return result;
  }

  protected async getBlob(url: string, parameter: any): Promise<any> {
    let result = null;

    await this.client
      .get(encodeURI(url), { params: parameter, responseType: 'arraybuffer' as 'json' })
      .toPromise()
      .then(response => {
        result = response;
      }).catch(err => {
        result = { error: err as Response };
      });

    return result;
  }

  protected async post(url: string, body: any): Promise<any> {
    let result = null;

    await this.client
      .post(encodeURI(url), body)
      .toPromise()
      .then(response => {
        result = response;
      })
      .catch(err => {
        result = { error: err as Response };
      });

    return result;
  }

  protected async put(url: string, body: any): Promise<any> {
    let result = null;

    await this.client
      .put(encodeURI(url), body)
      .toPromise()
      .then(response => {
        result = response;
      })
      .catch(err => {
        result = { error: err as Response };
      });

    return result;
  }

  protected async delete(url: string): Promise<any> {
    let result = null;

    await this.client
      .delete(encodeURI(url))
      .toPromise()
      .then(response => {
        result = response;
      })
      .catch(err => {
        result = { error: err as Response };
      });

    return result;
  }
}
