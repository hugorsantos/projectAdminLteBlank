import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-confirm-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
    @Input() show = false;
    @Input() title = 'Confirmar ação';
    @Input() message = 'Tem certeza que deseja realizar esta ação?';
    @Input() confirmText = 'Confirmar';
    @Input() cancelText = 'Cancelar';
    @Input() confirmClass = 'btn-danger';
    @Output() confirmed = new EventEmitter<void>();
    @Output() cancelled = new EventEmitter<void>();

    onConfirm() {
        this.confirmed.emit();
        this.show = false;
    }

    onCancel() {
        this.cancelled.emit();
        this.show = false;
    }
}