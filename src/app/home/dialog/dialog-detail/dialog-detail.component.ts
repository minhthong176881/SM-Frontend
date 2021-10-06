import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDetail } from 'src/app/services/auth.service';
import { Server, ServerService } from 'src/app/services/server.service';
import { DialogAuthenticationComponent } from '../dialog-authentication/dialog-authentication.component';
import { DialogTerminalComponent } from '../dialog-terminal/dialog-terminal.component';
import { DialogWarnComponent } from '../dialog-warn/dialog-warn.component';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.css']
})
export class DialogDetailComponent implements OnInit {
  currentServer: Server;
  hide: boolean;
  user: UserDetail;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private serverService: ServerService,
    public dialog: MatDialog) {
    this.currentServer = data.server;
    this.hide = data.hide;
    this.user = data.user;
  }

  ngOnInit(): void {
  }

  viewPassword() {
    if (this.user.role === 'admin') {
      this.openAuthenticationDialog(this.user.username);
    } else {
      this.dialog.open(DialogWarnComponent, { data: {"mode": "view"} });
    }
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

  connect() {
    this.serverService.getServerById(this.currentServer.id).subscribe((result: Server) => {
      this.dialog.open(DialogTerminalComponent, {
        data: {
          server: result
        }
      });
    });
  }
}
