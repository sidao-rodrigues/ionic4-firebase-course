import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  exports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class SharedModule { }
/*Esses cara estão sendo usados nos componentes criados*/
