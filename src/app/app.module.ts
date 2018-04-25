import {BrowserModule} from '@angular/platform-browser';
import {Compiler, NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'a',
          loadChildren: './a/a.module#AModule',
        }
      ]
    )
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader},
  ]
})
export class AppModule {
}
