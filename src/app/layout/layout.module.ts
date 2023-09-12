import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [CommonModule, NgScrollbarModule, SharedModule],
  declarations: [],
})
export class LayoutModule {}
