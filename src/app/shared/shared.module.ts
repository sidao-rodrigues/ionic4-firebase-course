import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MenuToggleComponent } from './components/menu-toggle/menu-toggle.component';
import { LogoutButtonComponent } from '../shared/components/logout-button/logout-button.component';

@NgModule({
  declarations: [LogoutButtonComponent, MenuToggleComponent],
  imports:[IonicModule],
  exports: [CommonModule, ReactiveFormsModule, IonicModule, MenuToggleComponent, LogoutButtonComponent ]
})
export class SharedModule { }
/*Esses cara estão sendo usados nos componentes criados*/
