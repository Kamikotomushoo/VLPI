import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderHelperService {

  isLoad = new BehaviorSubject(false);

  constructor() { }
}
