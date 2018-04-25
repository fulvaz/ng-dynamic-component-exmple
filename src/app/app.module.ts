import {BrowserModule} from '@angular/platform-browser';
import {Compiler, NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {DialogModule} from "./component/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DialogModule,
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
