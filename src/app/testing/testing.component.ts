import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterHelperService } from '../core/services/router-helper.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit, OnDestroy {

  status = 'taskList';
  topicSelected = '';
  topicsList = [
    { name: 'unit', title: 'Unit Tests' },
    { name: 'nUnit', title: 'NUnit Tests' },
    { name: 'jUnit', title: 'JUnit Tests' },
    { name: 'embUnit', title: 'Embunit Tests' },
  ];

  constructor(
    private routerHalper: RouterHelperService,
    private router: Router,
    private route: ActivatedRoute,
    public userService: AuthService
  ) { }

  ngOnInit(): void {
    this.routerHalper.selectedModule.next('testing');
  }

  goBack() {
    if (!this.topicSelected) {
      window.history.back();
      this.routerHalper.selectedModule.next('');
    } else {
      this.topicSelected = '';
      this.routerHalper.selectedTopic.next('');
    }
  }

  selectTopic(topicName: string) {
    this.topicSelected = topicName;
    this.routerHalper.selectedTopic.next(topicName);
  }

  openStat() {
    this.status = 'statistics';
    this.router.navigate(['statistics'], { relativeTo: this.route });
  }

  closeStatistics() {
    window.history.back();
    this.status = 'taskList';
  }

  ngOnDestroy() {
  }

}
