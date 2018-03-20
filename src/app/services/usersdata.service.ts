import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersdataService {

  constructor(
    private http: HttpClient
  ) { }



  getData(url: string): any {

    return this.http.get(url);
  }

}