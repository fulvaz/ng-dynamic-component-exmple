import {
  Compiler, COMPILER_OPTIONS, CompilerFactory,
  Component, Injector, NgModule, NgModuleFactory, NgModuleFactoryLoader, SystemJsNgModuleLoader, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AComponent} from "./a/a.component";
import {JitCompilerFactory} from "@angular/platform-browser-dynamic";
import {DialogService} from "./component/dialog";


export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

declare const System: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [

    {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]}
  ]
})
export class AppComponent {
  title = 'app';
  @ViewChild('container', {read: ViewContainerRef})
  protected mainContainer: ViewContainerRef;

  constructor(private injector: Injector, private loader: NgModuleFactoryLoader, private compiler: Compiler, private dialogService: DialogService) {
  }

  loadModule() {
    this.loader.load('./a/a.module#AModule').then((factory) => {
      const module = factory.create(this.injector);
      const r = module.componentFactoryResolver;
      const cmpFactory = r.resolveComponentFactory(AComponent);

      // create a component and attach it to the view
      const componentRef = cmpFactory.create(this.injector);
      this.mainContainer.insert(componentRef.hostView);
    });
  }


  manualCompile() {
    System.import('./a/a.module').then((module) => {
      this.compiler.compileModuleAndAllComponentsAsync(module.AModule)
        .then((compiled) => {
          const m = compiled.ngModuleFactory.create(this.injector);
          const factory = compiled.componentFactories[0];
          const cmpRef = factory.create(this.injector, [], null, m);
          this.mainContainer.insert(cmpRef.hostView);
        })
    });
  }

  @ViewChild('vc', {read: ViewContainerRef}) container: ViewContainerRef;

  renderTemplate() {
    const template = '<span>generated on the fly: {{name}}</span>';

    const tmpCmp = Component({template: template})(class {
    });
    const tmpModule = NgModule({declarations: [tmpCmp], entryComponents: [tmpCmp]})(class {
    });

    this.compiler.compileModuleAndAllComponentsAsync(tmpModule)
      .then((compiled) => {
        const factory = compiled.componentFactories[0];
        const compRef = this.container.createComponent(factory);
        compRef.instance.name = 123;
      });
  }

  openModal() {
    this.loader.load('./a/a.module#AModule').then((factory) => {
      const module = factory.create(this.injector);
      const r = module.componentFactoryResolver;
      const cmpFactory = r.resolveComponentFactory(AComponent);

      // create a component and attach it to the view
      const componentRef = cmpFactory.create(this.injector);

      const dialogRef = this.dialogService.create({
        viewRef: componentRef.hostView,
      });

    });
  }
}
