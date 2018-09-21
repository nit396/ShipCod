import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Batch } from '../shared/models/batch.model';

@Injectable()
export class BatchService {

  constructor(private http: HttpClient) { }

  getBatchs(): Observable<Batch[]> {
    return this.http.get<Batch[]>('/api/batchs');
  }

  countBatchs(): Observable<number> {
    return this.http.get<number>('/api/batchs/count');
  }

  addBatch(batch: Batch): Observable<Batch> {
    return this.http.post<Batch>('/api/batch', batch);
  }

  getData(batch: Batch): Observable<Batch> {
    return this.http.post<Batch>('/api/getdata', batch);
  }

  verifyData(batch: any): Observable<any> {
    return this.http.post<any>('/api/verifydata', batch);
  }

  getBatch(batch: Batch): Observable<Batch> {
    return this.http.get<Batch>(`/api/batch/${batch._id}`);
  }

  editBatch(batch: Batch): Observable<any> {
    return this.http.put(`/api/batch/${batch._id}`, batch, { responseType: 'text' });
  }

  deleteBatch(batch: Batch): Observable<any> {
    return this.http.delete(`/api/batch/${batch._id}`, { responseType: 'text' });
  }

}
