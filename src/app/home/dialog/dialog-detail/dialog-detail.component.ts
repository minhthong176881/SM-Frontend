import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteServerResponse, Server, ServerService } from 'src/app/services/server.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.css']
})
export class DialogDetailComponent implements OnInit {

  currentServer: Server;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Server, 
    private serverService: ServerService, 
    private helperService: HelperService, 
    private _snackBar: MatSnackBar) {
    this.currentServer = data;
  }

  ngOnInit(): void {
  }

}
