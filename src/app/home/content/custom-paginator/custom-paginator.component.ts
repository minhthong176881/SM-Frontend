import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css']
})
export class CustomPaginatorComponent implements OnInit, OnChanges {
  @Input() total: number;
  @Input() range: number;
  @Input() currentPage: number;
  @Input() hasNextPage: boolean;
  @Output() pageSizeEvent = new EventEmitter<number>();
  @Output() nextPageEvent = new EventEmitter<number>();
  @Output() prevPageEvent = new EventEmitter<number>();
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  start = 0;
  end = 0;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    if (changes.currentPage) {
      this.currentPage = changes.currentPage.currentValue;
      this.start = this.currentPage * this.pageSize + 1;
    }
    if (changes.range) {
      this.end = this.start + changes.range.currentValue - 1;
    }
  }

  pageSizeChange(selected: any) {
    this.pageSize = selected.value;
    this.pageSizeEvent.emit(this.pageSize);
  }

  nextPageChange() {
    if (this.range >= this.pageSize) {
      this.currentPage++;
      this.nextPageEvent.emit(this.currentPage);
    }
  }

  prevPageChange() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.prevPageEvent.emit(this.currentPage);
    }
  }

}
