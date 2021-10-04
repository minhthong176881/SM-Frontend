import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Server } from 'src/app/services/server.service';
import { Terminal } from 'xterm';

@Component({
  selector: 'app-dialog-terminal',
  templateUrl: './dialog-terminal.component.html',
  styleUrls: ['./dialog-terminal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogTerminalComponent implements OnInit {

  public term: Terminal;
  public container: HTMLElement | null;
  private server: Server;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.server = data.server;
  }

  ngOnInit() {
    this.term = new Terminal();
    this.container = document.getElementById('terminal');
    if (this.container) {
      this.term.open(this.container);
      this.term.writeln('Hello ' + this.server.name);
    }
  }
}

