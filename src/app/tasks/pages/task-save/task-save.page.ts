import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss'],
})
export class TaskSavePage implements OnInit {

  public taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private overlayService: OverlayService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.createForm();
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
