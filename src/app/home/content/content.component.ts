import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService, Server, ServerResponse, ExportResponse, ServerCheckResponse, ServerValidateResponse, ServerLogResponse, DeleteServerResponse } from 'src/app/services/server.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['ip', 'port', 'username', 'password', 'validate', 'status', 'options'];
  dataSource!: MatTableDataSource<Server>;
  total: number = 0;
  pageSize: number = 5;
  pageIndex: number = 1;
  pageEvent!: PageEvent;
  isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private serverService: ServerService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getServer(1, 5, '');
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.getServer(1, 5, filterValue.trim().toLowerCase());
  }

  getServer(pageIndex: number, pageOffset: number, query: string) {
    this.isLoading = true;
    this.serverService.getServers(pageIndex, pageOffset, query).subscribe((result: ServerResponse) => {
      this.total = result.total;
      this.dataSource = new MatTableDataSource(result.servers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;;
      this.isLoading = false;
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

  log(id: string, start: string, end: string, date: string, month: string) {
    this.serverService.log(id, start, end, date, month).subscribe((result: ServerLogResponse) => {
      console.log(result);
    })
  }

  openDialog(data: Server | null, mode: string) {
    this.dialog.open(DialogComponent, {
      data: {
        mode: mode,
        server: data
      }
    });
  }

  edit(id: string) {
    this.serverService.getServerById(id).subscribe((result: Server) => {
      this.openDialog(result, 'edit');
    });
  }

  delete(id: string) {
    this.serverService.getServerById(id).subscribe((result: Server) => {
      this.openDialog(result, 'delete');
    });
  }

  handlePage(event: PageEvent, filterValue: string): PageEvent {
    this.getServer(event.pageIndex + 1, event.pageSize, filterValue.trim().toLowerCase());
    return event;
  }
}
