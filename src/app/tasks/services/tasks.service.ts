import { Injectable } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';
import { Firestore } from '../../core/classes/firestore.class';
import { Task } from '../models/task.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends Firestore<Task>{

  constructor(protected db: AngularFirestore, private authService: AuthService) { 
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe(user => {
      if(user) {
        this.setCollection(`/users/${user.uid}/tasks`);
        return;
      }
      this.setCollection(null);
    });
  }

}
