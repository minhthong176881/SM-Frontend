import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Server } from 'src/app/services/server.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public form: FormGroup = new FormGroup({})
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      ip: ['', Validators.required],
      port: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  addServer() {
    console.log(this.form.value);
  }

}

export interface DialogData {
  mode: string;
  server: Server
}

