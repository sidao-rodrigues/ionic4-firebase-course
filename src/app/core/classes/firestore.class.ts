import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export abstract class Firestore<T> {

  protected collection: AngularFirestoreCollection<T>;

  constructor(protected db: AngularFirestore) { }

  protected setCollectio(path: string, queryFn?: QueryFn): void {
    this.collection = path ? this.db.collection(path, queryFn) : null;
  }

  public getAll(): Observable<T[]> {
    return this.collection.valueChanges();
  }

}