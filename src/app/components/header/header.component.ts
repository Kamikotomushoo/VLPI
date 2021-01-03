import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name: string;
  userEmail: string;


  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem("userData")).name +
      " " +
      JSON.parse(localStorage.getItem("userData")).surname;
    this.userEmail = JSON.parse(localStorage.getItem("userData")).email;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToProfilePage() {
    this.router.navigate(['profile']);
  }

}
