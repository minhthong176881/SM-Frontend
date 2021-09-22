import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteServerResponse, Server, ServerService } from 'src/app/services/server.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public form: FormGroup = new FormGroup({})
  currentServer: Server;
  mode: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder, private serverService: ServerService, private _snackBar: MatSnackBar) {
    this.currentServer = data.server;
    this.mode = data.mode;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      ip: ['', [Validators.required, Validators.pattern('\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b')]],
      port: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      description: [''],
    });

    if (this.mode == 'edit') {
      this.form.patchValue({
        ip: this.currentServer.ip,
        port: this.currentServer.port,
        username: this.currentServer.username,
        password: this.currentServer.password,
        description: this.currentServer.description,
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  openSnackBar(message: string, action: string, custom: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [custom],
    });
  }

  addServer() {
    this.serverService.add(this.form.value).subscribe(
      (result: Server) => {
        if (result != null)
          this.openSnackBar('Add server successfully!', "", 'success')
        else this.openSnackBar('Fail to add server!', "", 'fail')
      });
      window.location.reload();
  }

  updateServer() {
    this.serverService.update(this.currentServer.id, this.form.value).subscribe(
      (result: Server) => {
        if (result != null)
          this.openSnackBar('Update server successfully!', "", 'success')
        else this.openSnackBar('Fail to update server!', "", 'fail')
      });
  }

  deleteServer() {
    this.serverService.delete(this.currentServer.id).subscribe(
      (result: DeleteServerResponse) => {
        if (result.deleted)
          this.openSnackBar('Delete server successfully!', "", 'success')
        else this.openSnackBar('Fail to delete server!', "", 'fail')
      });
    window.location.reload();
  }

}

export interface DialogData {
  mode: string;
  server: Server
}

