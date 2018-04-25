import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AComponent} from "./a.component";
import {BComponent} from "./b/b.component";
import {RouterModule} from "@angular/router";
import {CComponent} from "./c/c.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
          path: '',
          component: AComponent,
          children: [
            {
              path: 'bcc',
              component: BComponent,
            },
            {
              path: 'c',
              component: CComponent,
            },

          ]
        },
        {
          path: 'd',
          component: CComponent,
        }

      ]
    )
  ],
  declarations: [AComponent, BComponent, CComponent]
})
export class AModule {
}
