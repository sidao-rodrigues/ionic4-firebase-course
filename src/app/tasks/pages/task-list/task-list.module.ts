import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskListPageRoutingModule } from './task-list-routing.module';

import { TaskListPage } from './task-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    TaskListPageRoutingModule
  ],
  declarations: [TaskListPage]
})
export class TaskListPageModule {}
