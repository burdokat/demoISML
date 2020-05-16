import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonicSelectableModule } from 'ionic-selectable';

import { ChildPageRoutingModule } from './child-routing.module';

import { ChildPage } from './child.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    IonicSelectableModule,
    ChildPageRoutingModule
  ],
  declarations: [ChildPage]
})
export class ChildPageModule {}
