import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div
            class="toast-container position-fixed top-0 end-0 p-3"
            style="z-index: 11000"
            *ngIf="show"
        >
            <div
                class="toast show fade-in"
                [class.bg-success]="type === 'success'"
                [class.bg-danger]="type === 'error'"
                [class.bg-warning]="type === 'warning'"
                [class.bg-info]="type === 'info'"
                [class.text-white]="type !== 'warning'"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div class="toast-header">
                    <strong class="me-auto">{{ title }}</strong>
                    <button
                        type="button"
                        class="btn-close"
                        (click)="close()"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="toast-body" *ngIf="message">
                    {{ message }}
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .toast {
                min-width: 250px;
            }
        `,
    ],
})
export class ToastComponent {
    @Input() show = false;
    @Input() type: ToastType = 'info';
    @Input() title = 'Notificação';
    @Input() message = '';
    @Input() duration = 3000;

    ngOnInit() {
        if (this.show && this.duration > 0) {
            setTimeout(() => this.close(), this.duration);
        }
    }

    close() {
        this.show = false;
    }
}