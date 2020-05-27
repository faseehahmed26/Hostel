import { Injectable } from '@angular/core';
import { Hostel } from '../shared/hostel';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class HostelService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }


  getHostels(): Observable<Hostel[]> {
    return this.http.get<Hostel[]>(baseURL + 'hostels')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  getHostel(id: number): Observable<Hostel> {
    return this.http.get<Hostel>(baseURL + 'hostels/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }



  getHostelIds(): Observable<number[] | any> {
    return this.getHostels().pipe(map(hostels => hostels.map(hostel => hostel.id)))
      .pipe(catchError(error => error));
  }
  putHostel(hostel: Hostel): Observable<Hostel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Hostel>(baseURL + 'hostels/' + hostel.id, hostel, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
  
  
}
