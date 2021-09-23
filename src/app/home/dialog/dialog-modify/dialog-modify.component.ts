import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Server, ServerService } from 'src/app/services/server.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-dialog-modify',
  templateUrl: './dialog-modify.component.html',
  styleUrls: ['./dialog-modify.component.css']
})
export class DialogModifyComponent implements OnInit {

  public form: FormGroup = new FormGroup({})
  currentServer: Server;
  mode: string;
  hide = true

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private fb: FormBuilder, 
    private serverService: ServerService, 
    private helperService: HelperService,
    private _snackBar: MatSnackBar) {
    this.currentServer = data.server;
    this.mode = data.mode;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      ip: ['', [Validators.required, Validators.pattern('^(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4})$')]],
      name: ['', [Validators.required]],
      port: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      description: [''],
    });

    if (this.mode == 'edit') {
      this.form.patchValue({
        name: this.currentServer.name,
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

  addServer() {
    this.serverService.add(this.form.value).subscribe(
      (result: Server) => {
        if (result != null)
          this.helperService.openSnackBar(this._snackBar, 'Add server successfully!', "", 'success')
        else this.helperService.openSnackBar(this._snackBar, 'Fail to add server!', "", 'fail')
      });
  }

  updateServer() {
    this.serverService.update(this.currentServer.id, this.form.value).subscribe(
      (result: Server) => {
        if (result != null)
          this.helperService.openSnackBar(this._snackBar,'Update server successfully!', "", 'success')
        else this.helperService.openSnackBar(this._snackBar, 'Fail to update server!', "", 'fail')
      });
  }
}

export interface DialogData {
  mode: string;
  server: Server
}

