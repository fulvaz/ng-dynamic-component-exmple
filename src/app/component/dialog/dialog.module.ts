import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InjectionService } from './injection.service';

import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';

@NgModule({
  declarations: [DialogComponent],
  exports: [DialogComponent],
  providers: [DialogService, InjectionService],
  imports: [CommonModule, FormsModule],
  entryComponents: [DialogComponent, ]
})
export class DialogModule { }
