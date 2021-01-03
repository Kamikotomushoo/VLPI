import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { IUserData } from "../../../interfaces/user-data";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { AuthErrors } from "src/app/classes/error";
import { ErrorDialogComponent } from "../../../core/components/error-dialog/error-dialog.component";
import { LoaderHelperService } from 'src/app/core/services/loader-helper.service';

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  ErrorType = AuthErrors;
  authError: string = "";

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private loader: LoaderHelperService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      userEmail: new FormControl(null, Validators.required),
      userPassword: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.authError = "";
    if (this.loginForm.invalid) {
      return;
    }
    const loginData: IUserData = {
      email: this.loginForm.get("userEmail").value,
      password: this.loginForm.get("userPassword").value,
    };

    console.log("start login in");
    this.loader.isLoad.next(true);
    this.authService.singIn(loginData).subscribe(
      (responseData) => {
        this.loginForm.reset();
        return this.authService.getUserInfo().subscribe(
          (responseData) => {
            this.loader.isLoad.next(false);
            this.router.navigate(["/home"]);
          },
          (errorData) => {
            this.loader.isLoad.next(false);
            console.log(errorData);
            this.authError = errorData;
            if (errorData.name === AuthErrors.undefinedError) {
              this.openErrorResponseDialog(errorData.message);
            }
          }
        );
      },
      (errorData) => {
        console.log(errorData);
        this.loader.isLoad.next(false);
        this.authError = errorData;
        if (errorData.name === AuthErrors.undefinedError) {
          this.openErrorResponseDialog(errorData.message);
        }
      }
    );
  }

  openErrorResponseDialog(errorName: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: "fit-content",
      data: errorName,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
}
