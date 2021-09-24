import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Server, ServerService } from 'src/app/services/server.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelperService } from 'src/app/services/helper.service';
import { DialogAuthenticationComponent } from '../dialog-authentication/dialog-authentication.component';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.css']
})
export class DialogDetailComponent implements OnInit {

  currentServer: Server;
  hide: boolean;
  user: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private serverService: ServerService, 
    private helperService: HelperService, 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {
    this.currentServer = data.server;
    this.hide = data.hide;
    this.user = data.user;
  }

  ngOnInit(): void {
  }

  openAuthenticationDialog(data: string) {
    if (this.hide) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { data };
      const dialogRef = this.dialog.open(DialogAuthenticationComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((data: boolean) => {
        if (data) this.hide = false;
        else this.hide = true;
      });
    }
    else this.hide = true
  }

}
