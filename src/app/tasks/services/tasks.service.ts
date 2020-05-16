import { Injectable } from '@angular/core';

import { Firestore } from '../../core/classes/firestore.class';
import { Task } from '../models/task.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends Firestore<Task>{

  constructor(protected db: AngularFirestore) { 
    super(db);
  }

}
