import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { TopbarComponent } from './topbar/topbar.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ContentComponent } from './content/content.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogModule } from './dialog/dialog.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CustomPaginatorComponent } from './content/custom-paginator/custom-paginator.component';
import { CustomTableComponent } from './content/custom-table/custom-table.component';


@NgModule({
  declarations: [
    HomeComponent,
    TopbarComponent,
    ContentComponent,
    CustomPaginatorComponent,
    CustomTableComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    HomeRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatCheckboxModule
  ],
})
export class HomeModule { }
