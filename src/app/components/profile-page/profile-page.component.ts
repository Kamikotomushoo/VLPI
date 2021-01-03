import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  name: string;
  userEmail: string;
  surname: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem("userData")).name;
    this.surname = JSON.parse(localStorage.getItem("userData")).surname;
    this.userEmail = JSON.parse(localStorage.getItem("userData")).email;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goBack() {
    window.history.back();
  }

}
