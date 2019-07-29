import { Injectable } from '@angular/core';
import { Utilities } from '../utils/utilities';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public baseUrl: string;

  constructor(
    private u: Utilities,
    private entityType: string
  ) { }
}
