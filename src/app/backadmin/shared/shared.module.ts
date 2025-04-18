import { CommonModule } from '@angular/common';
import { SafeURLPipe } from './pipes/safe-url.pipe';
import { NgModule } from '@angular/core';
@NgModule({
  declarations: [SafeURLPipe],
  imports: [CommonModule],
  exports: [ SafeURLPipe]
})
export class SharedModule { }