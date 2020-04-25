import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnonymousRoutingModule } from './anonymous.routing';
import {  Page2Component } from './page2/page2.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
@NgModule({
  declarations: [
    Page2Component
  ],
  imports: [
    CommonModule,
    AnonymousRoutingModule,
    ReactiveFormsModule,
    NgxUiLoaderModule
  ]
})
export class AnonymousModule { }
