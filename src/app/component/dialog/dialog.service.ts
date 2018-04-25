import {Injectable, EventEmitter} from '@angular/core';

import {InjectionService} from './injection.service';
import {InjectionRegisteryService} from './injection-registery.service';

import {DialogComponent} from './dialog.component';

@Injectable()
export class DialogService extends InjectionRegisteryService {

    defaults: any = {
        inputs: {
            zIndex: 1040,
            closeOnBlur: true,
            closeOnEscape: true,
            closeButton: true,
            showOverlay: true,
            visible: true
        }
    };

    zIndex = 995;
    type: any = DialogComponent;
    // 只允许有一个modal
    isOpened = false;

    constructor(injectionService: InjectionService) {
        super(injectionService);
    }

    create(bindings): any {
        // if (this.isOpened) return;
        // this.isOpened = true;
        const component = super.create(bindings);
        this.createSubscriptions(component);
        // 处理viewRef的传入, 因为组件不可见时无法获得viewContainerRef
        // 应该还有更好的方法, 不过先用着吧
        if (bindings.viewRef) {
            component.instance.viewRefContainer.insert(component.instance.viewRef);
        }
        return component;
    }

    destroy(component): void {
        const hasOverlay = component.instance.showOverlay;

        setTimeout(() => {
            super.destroy(component);
            this.zIndex = this.zIndex - 2;
        });
        this.isOpened = false;
    }

    createSubscriptions(component): any {
        let cancelSub;
        let closeSub;
        let confirmSub;
        let overlaySub;

        const kill = (c) => {
            if (c !== component) {
                return;
            }
            this.isOpened = false;
            cancelSub.unsubscribe();
            confirmSub.unsubscribe();
            closeSub.unsubscribe();
            if (overlaySub) overlaySub.unsubscribe();
            this.destroy(component);
        };

        cancelSub = component.instance.cancel.subscribe(kill.bind(this, component));
        closeSub = component.instance.cancel.subscribe(kill.bind(this, component));
        confirmSub = component.instance.confirm.subscribe(kill.bind(this, component));

    }

    assignDefaults(bindings): any {
        bindings = super.assignDefaults(bindings);
        return bindings;
    }

}
