import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../models/task.model';

import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage {

  public tasks$: Observable<Task[]>;

  constructor(private tasksService: TasksService, private navCtrl: NavController, private overlaySerive: OverlayService) { }

  ionViewDidEnter(): void {
    this.tasks$ = this.tasksService.getAll();
  }

  onUpdate(task: Task): void {
    this.navCtrl.navigateForward([`/tasks/edit/${task.id}`]);
  }

  async onDelete(task: Task): Promise<void> {
    await this.overlaySerive.alert({
      message: `Do you really want to delete the task "${task.title}"?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.tasksService.delete(task);
            await this.overlaySerive.toast({
              message: `Task "${task.title}" deleted!`,
              buttons: ['Ok']
            });
          }
        },
        'No'
      ]
    });
  }
}
