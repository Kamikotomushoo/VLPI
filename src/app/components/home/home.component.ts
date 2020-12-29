import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AuthErrors } from "src/app/classes/error";
import { RouterHelperService } from 'src/app/core/services/router-helper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  roleId: number;
  name: string;
  userEmail: string;
  dialog: MatDialog;
  authError: any;
  selectedModule = '';
  modulesList: any[] = [
    { title: 'Analysis Module', route: '' },
    { title: 'Engineering Module', route: '' },
    { title: 'Modeling Module', route: '' },
    { title: 'Developming Module', route: '' },
    { title: 'Testing Module', route: 'testing' },
  ];

  selectedModuleSub$: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private routerHalper: RouterHelperService
  ) {}

  ngOnInit() {
    this.selectedModuleSub$ = this.routerHalper.selectedModule.subscribe(moduleRoute => {
      this.selectedModule = moduleRoute;
    })
  }



  private openErrorResponseDialog(errorName: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: "fit-content",
      data: errorName,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  goToModule(route) {

    if (route) {
      this.routerHalper.selectedModule.next(route);
      this.router.navigate([route], { relativeTo: this.route });
    }
  }

  ngOnDestroy() {
    this.selectedModuleSub$.unsubscribe();
  }

}
