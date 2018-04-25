import {
    Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild, ViewContainerRef,
    ViewRef
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'ngx-dialog',
    styleUrls: ['./dialog.component.scss'],
    template: `
        <div class="modal-backdrop" (click)="hide()"></div>
        <div
            class="ngx-dialog"
            [style.zIndex]="zIndex">
            <div
                class="ngx-dialog-content"
                [ngClass]="cssClass"
                [@visibilityTransition]="visibleState"
                [style.zIndex]="contentzIndex"
                tabindex="-1"
                role="dialog">
                <div
                    class="ngx-dialog-header"
                    *ngIf="title || closeButton">

                    <h2
                        *ngIf="title"
                        class="ngx-dialog-title"
                        [innerHTML]="title">
                    </h2>
                    <button
                        *ngIf="closeButton"
                        type="button"
                        class="close"
                        (click)="hide()">
                        <span class="icon-x">✕</span>
                    </button>
                </div>
                <div class="ngx-dialog-body">
                    <ng-template
                        *ngIf="template"
                        [ngTemplateOutlet]="template"
                        [ngTemplateOutletContext]="{ context: context }">
                    </ng-template>
                    <div
                        class="flex flex-jc"
                        *ngIf="content"
                        [innerHTML]="content">
                    </div>
                    <div #container
                        >
                    </div>
                    <ng-content></ng-content>
                </div>
                <div class="modal-footer">
                    <button *ngIf="isCancelShow" type="button" class="btn btn--secondary"
                            (click)="hide()">取消
                    </button>
                    <button *ngIf="isConfirmShow" type="button" class="btn btn--primary"
                            (click)="onConfirm(context)">确定
                    </button>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('visibilityTransition', [
            state('active', style({
                opacity: 1,
                transform: 'scale3d(1, 1, 1)'
            })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'scale3d(1.2, 1.2, 1.2)'
                }),
                animate('0.2s ease-out')
            ]),
            transition('* => inactive', [
                style({
                    opacity: 1,
                    transform: 'scale3d(1, 1, 1)'
                }),
                animate('0.2s ease-out', style({
                    transform: 'scale3d(0.9, 0.9, 1)',
                    opacity: 0
                }))
            ])
        ])
    ],
    host: {
        tabindex: '-1'
    }
})
export class DialogComponent implements OnInit, OnDestroy {

    @Input() id: string;
    @Input() visible: boolean;
    @Input() zIndex: number;
    @Input() title = '提示';
    @Input() content: string;
    @Input() template: any;
    @Input() cssClass: string;
    @Input() context: any;
    @Input() closeOnBlur: boolean;
    @Input() closeOnEscape: boolean;
    @Input() closeButton: boolean;
    @Input() isCancelShow = true;
    @Input() isConfirmShow = true;
    @Input() viewRef: ViewRef;

    @ViewChild('container', { read: ViewContainerRef })
    viewRefContainer: ViewContainerRef;

    @Output() open = new EventEmitter();
    @Output() cancel = new EventEmitter();
    @Output() close = new EventEmitter();
    @Output() confirm = new EventEmitter();

    get contentzIndex(): number {
        return this.zIndex + 1;
    }

    get visibleState(): string {
        return this.visible ? 'active' : 'inactive';
    }

    constructor(private element: ElementRef, private renderer: Renderer2) {
    }

    ngOnInit(): void {
        if (this.visible) this.show();
    }

    show(): void {
        this.visible = true;

        setTimeout(() => {
            this.element.nativeElement.focus();
        }, 10);

        this.open.emit();
    }

    @HostListener('keydown.esc')
    onKeyDown(): void {
        if (this.closeOnEscape) this.hide();
    }

    hide(): void {
        this.visible = false;
        this.cancel.emit();
    }

    onConfirm(context): void {
        this.visible = false;
        this.confirm.emit(context);
    }

    @HostListener('document:click', ['$event.target'])
    onDocumentClick(target): void {
        if (this.containsTarget(target)) {
            this.hide();
        }
    }

    containsTarget(target): boolean {
        return this.closeOnBlur &&
            target.classList.contains('dialog');
    }

    /**
     * On destroy callback
     *
     * @memberOf DrawerComponent
     */
    ngOnDestroy() {
        this.close.emit(true);
    }

}
