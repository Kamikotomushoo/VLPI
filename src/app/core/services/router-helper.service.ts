import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterHelperService {

  selectedModule = new BehaviorSubject('');

  constructor() { }
}
