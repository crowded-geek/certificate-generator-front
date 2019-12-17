import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Certificate } from './certificate.model';
import { Environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  getCertificates(): Observable<Certificate[]> {
    const token = 'JWT ' + localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().set('Authorization', token)
    };
    return this.http.get<Certificate[]>(Environment.baseUrl+"api/org/certificates/", options);
  }

  private generateSingleCertificate() {
    // Would be used when organization wants to generate single certificate
  }

  generateBulkCertificate(csv) {
    let data = new FormData();
    data.set('file', csv);
    let token = 'JWT '+localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().set('Authorization', token)
    };
    const req = new HttpRequest('POST', Environment.baseUrl+'api/issue_certificate/csv/', data, options);
    return this.http.request(req);
  }
}
