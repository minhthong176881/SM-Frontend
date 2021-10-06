import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CheckServerExist, Server, ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private serverService: ServerService) { }

  confirmValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  validateServerExistsValidator(ipControlName: string, portControlName: string, currentServer: Server) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[ipControlName];
      const portControl = formGroup.controls[portControlName];
      if (control.value && portControl.value) {
        if (currentServer?.ip !== control.value || currentServer?.port !== portControl.value) {
        this.serverService.checkServerExists(control.value, parseInt(portControl.value)).subscribe(
          (data: CheckServerExist) => {
            if (data.exists) {
              control.setErrors({ serverExists: true });
              portControl.setErrors({ serverExists: true });
            } else {
              control.setErrors(null);
              portControl.setErrors(null);
            }
          })
        }
      }
    }
  }

  openSnackBar(snackbar: MatSnackBar, message: string, action: string, custom: string) {
    snackbar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [custom],
    });
  }
}
