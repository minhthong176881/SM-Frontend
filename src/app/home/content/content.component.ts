import { AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService, Server, ServerResponse, ExportResponse, ServerCheckResponse, ServerValidateResponse, ServerLogResponse } from '../../services/server.service';
import { DialogModifyComponent } from '../dialog/dialog-modify/dialog-modify.component';
import { DialogDeleteComponent } from '../dialog/dialog-delete/dialog-delete.component'
import { DialogDetailComponent } from '../dialog/dialog-detail/dialog-detail.component';
import { DialogAuthenticationComponent } from '../dialog/dialog-authentication/dialog-authentication.component';
import { DialogChartComponent } from '../dialog/dialog-chart/dialog-chart.component';
import { Task } from './custom-table/custom-table.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContentComponent implements OnInit, AfterViewInit {

  @Input() user!: string;
  displayedColumns: string[] = ['name', 'ip', 'port', 'username', 'password', 'validate', 'status', 'options'];
  dataSource!: MatTableDataSource<Server>;
  total: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  pageEvent!: PageEvent;
  itemInPage: number = 0;
  hasNexPage: boolean;
  isLoading = true;
  hide = true;
  data: Server[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private serverService: ServerService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getServer(0, 5, '');
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.getServer(0, 5, filterValue.trim().toLowerCase());
  }

  refresh() {
    this.pageIndex = 0;
    this.getServer(this.pageIndex, this.pageSize, '');
  }

  getServer(pageIndex: number, pageOffset: number, query: string) {
    this.isLoading = true;
    this.serverService.getServers(pageIndex + 1, pageOffset, query).subscribe((result: ServerResponse) => {
      this.total = result.total;
      this.dataSource = new MatTableDataSource(result.servers);
      this.itemInPage = result.servers.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;;
      this.isLoading = false;
      if (this.itemInPage < this.pageSize) this.hasNexPage = false;
      else this.hasNexPage = true;
    });
  }

  export() {
    this.serverService.export().subscribe((result: ExportResponse) => {
      if (result.downloadUrl) {
        window.open(result.downloadUrl);
      } else {
        alert('Error exporting');
      }
    });
  }

  check(id: string) {
    this.serverService.check(id).subscribe((result: ServerCheckResponse) => {
      console.log(result);
    });
  }

  validate(id: string) {
    this.serverService.validate(id).subscribe((result: ServerValidateResponse) => {
      console.log(result);
    });
  }

  // log(id: string, start: string, end: string, date: string, month: string) {
  //   this.serverService.log(id, start, end, date, month).subscribe((result: ServerLogResponse) => {
  //     console.log(result);
  //   })
  // }

  openModifyDialog(data: Server | null, mode: string) {
    let dialog = this.dialog.open(DialogModifyComponent, {
      data: {
        mode: mode,
        server: data
      }
    });
    dialog.afterClosed().subscribe((data: boolean) => {
      if (data)
        this.getServer(this.pageIndex, this.pageSize, "")
    });
  }

  openDeleteDialog(data: Server | null) {
    let dialog = this.dialog.open(DialogDeleteComponent, { data });
    dialog.afterClosed().subscribe((data: boolean) => {
      if (data)
        this.getServer(this.pageIndex, this.pageSize, "")
    });
  }

  openDetailDialog(server: Server | null) {
    const data = {
      server: server,
      hide: this.hide,
      user: this.user
    }
    this.dialog.open(DialogDetailComponent, { data });
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

  openLogChart(id: string) {
    this.serverService.log(id, '', '', '', '').subscribe((result: ServerLogResponse) => {
      const logs = result.logs;
      const data = {
        logs: logs,
        id: id
      }
      this.dialog.open(DialogChartComponent, {data});
    })
  }

  detail(id: string) {
    this.serverService.getServerById(id).subscribe((result: Server) => {
      this.openDetailDialog(result);
    });
  }

  edit(id: string) {
    this.serverService.getServerById(id).subscribe((result: Server) => {
      this.openModifyDialog(result, 'edit');
    });
  }

  delete(id: string) {
    this.serverService.getServerById(id).subscribe((result: Server) => {
      this.openDeleteDialog(result);
    });
  }

  handlePageSizeChange(pageSize: number) {
    this.pageIndex = 0;
    this.pageSize = pageSize;
    this.getServer(this.pageIndex, this.pageSize, '');
  }

  handlePageIndexChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.getServer(this.pageIndex, this.pageSize, '');
  }

  handleColumnChange(task: Task) {
    let columns: string[] = [];
    task.subtasks?.forEach(s => {
      if (s.completed) {
        if (s.name === 'Password validate') columns.push('validate');
        else columns.push(s.name.toLowerCase());
      }
    });
    this.displayedColumns = columns;
    this.displayedColumns.push('options');
  }
}
