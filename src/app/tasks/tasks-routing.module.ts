import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';


const routes: Routes = [
  { 
    path: '', 
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create',
        loadChildren: () => import('./pages/task-save/task-save.module').then( m => m.TaskSavePageModule)
      },
      {
      path: '',
      loadChildren: () => import('./pages/task-list/task-list.module').then( m => m.TaskListPageModule)
      }
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
