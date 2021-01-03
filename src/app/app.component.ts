import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { Route } from "@angular/compiler/src/core";
import { LoaderHelperService } from './core/services/loader-helper.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  title = "LeoQuiz";

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public loader: LoaderHelperService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.authService.logout();
  }
}
