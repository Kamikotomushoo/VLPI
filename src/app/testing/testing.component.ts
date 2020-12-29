import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterHelperService } from '../core/services/router-helper.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit, OnDestroy {

  status = 'taskList';

  constructor(
    private routerHalper: RouterHelperService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    window.history.back();
  }

  ngOnDestroy() {
    this.routerHalper.selectedModule.next('');
  }

}
