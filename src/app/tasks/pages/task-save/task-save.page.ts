import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ActivatedRoute } from '@angular/router';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss'],
})
export class TaskSavePage implements OnInit {

  public taskForm: FormGroup;
  public pageTitle = '...';
  public taskId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private overlayService: OverlayService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createForm();
    this.init();
  }

  public init(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if(!taskId) {
      this.pageTitle = 'Create Task';
      return;
    }
    this.taskId = taskId;
    this.pageTitle = 'Edit Task';
    this.tasksService
      .get(taskId)
      .pipe(take(1))
      .subscribe(({ title, done }) => {
        this.taskForm.get('title').setValue(title);
        this.taskForm.get('done').setValue(done);
      });
  }

  public createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false]
    });
  }

  public async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Saving...'
    });
    try {
      const task = await this.tasksService.create(this.taskForm.value);
      this.navCtrl.navigateBack(['/tasks']);
    } catch (error) {
      console.log('Error saving Taks: ', error);
      await this.overlayService.toast({
        message: error.message,
        buttons: ['Ok']
      });
    } finally {
      loading.dismiss();
    }
  }

}
