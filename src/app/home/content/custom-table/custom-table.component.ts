import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})

export class CustomTableComponent implements OnInit {
  @Output() taskEvent = new EventEmitter<Task>();
  task: Task = {
    name: 'Available columns',
    completed: true,
    color: 'primary',
    subtasks: [
      { name: 'Name', completed: true, color: 'primary' },
      { name: 'IP', completed: true, color: 'primary' },
      { name: 'Port', completed: true, color: 'primary' },
      { name: 'Username', completed: true, color: 'primary' },
      { name: 'Password', completed: true, color: 'primary' },
      { name: 'Password validate', completed: true, color: 'primary' },
      { name: 'Status', completed: true, color: 'primary' },
    ]
  };

  allComplete: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    this.taskEvent.emit(this.task);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
    this.taskEvent.emit(this.task);
  }

}
