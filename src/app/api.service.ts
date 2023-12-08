import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICalculateTotalRequest, ICalculateTotalResponse } from './models/car.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7030/api';

  constructor(private http: HttpClient) {}

  calculateTotal(request: ICalculateTotalRequest): Observable<ICalculateTotalResponse> {
    const url = `${this.baseUrl}/Vehicle/calculateTotalCost`;
    return this.http.post<ICalculateTotalResponse>(url, request);
  }
}
