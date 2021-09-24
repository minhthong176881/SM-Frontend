import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteServerResponse, Server, ServerService } from 'src/app/services/server.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {
  currentServer: Server;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Server,
    private dialogRef: MatDialogRef<DialogDeleteComponent>,
    private serverService: ServerService,
    private helperService: HelperService,
    private _snackBar: MatSnackBar) {
    this.currentServer = data;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  deleteServer() {
    this.serverService.delete(this.currentServer.id).subscribe(
      (result: DeleteServerResponse) => {
        if (result.deleted) {
          this.helperService.openSnackBar(this._snackBar, 'Delete server successfully!', "", 'success')
          this.dialogRef.close(true);
        }
        else {
          this.helperService.openSnackBar(this._snackBar, 'Fail to delete server!', "", 'fail')
          this.dialogRef.close(false);
        }
      });
  }

}
