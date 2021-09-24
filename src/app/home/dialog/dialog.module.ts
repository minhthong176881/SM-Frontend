import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModifyComponent } from './dialog-modify/dialog-modify.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from './dialog-detail/dialog-detail.component';
import { DialogAuthenticationComponent } from './dialog-authentication/dialog-authentication.component';
import { DialogChartComponent } from './dialog-chart/dialog-chart.component';


@NgModule({
  declarations: [
    DialogModifyComponent,
    DialogDeleteComponent,
    DialogDetailComponent,
    DialogAuthenticationComponent,
    DialogChartComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatDividerModule
  ]
})
export class DialogModule { }
