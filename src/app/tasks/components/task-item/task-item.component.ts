import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {

  @Input() public task: Task;
  @Output() public done = new EventEmitter<Task>();
  @Output() public update = new EventEmitter<Task>();
  @Output() public delete = new EventEmitter<Task>();

}
