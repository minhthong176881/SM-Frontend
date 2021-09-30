import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModifyComponent } from './dialog-modify/dialog-modify.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from './dialog-detail/dialog-detail.component';
import { DialogAuthenticationComponent } from './dialog-authentication/dialog-authentication.component';
import { DialogChartComponent } from './dialog-chart/dialog-chart.component';
import { DateComponent } from './date/date.component';
import { DialogWarnComponent } from './dialog-warn/dialog-warn.component';


@NgModule({
  declarations: [
    DialogModifyComponent,
    DialogDeleteComponent,
    DialogDetailComponent,
    DialogAuthenticationComponent,
    DialogChartComponent,
    DateComponent,
    DialogWarnComponent
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
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ]
})
export class DialogModule { }
