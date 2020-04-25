import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public.routing';


import { P404Component } from './Errors/p404/p404.component';
import { P500Component  } from './Errors/p500/p500.component';

@NgModule({
  declarations: [
    P404Component,
    P500Component
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
