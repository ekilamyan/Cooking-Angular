import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public lastSearchId = new BehaviorSubject<string>('');
  public lastSearchTerm = new BehaviorSubject<string>('');

  constructor() {
  }

}