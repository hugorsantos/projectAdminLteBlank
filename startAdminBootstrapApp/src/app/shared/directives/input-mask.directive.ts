import { Directive, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appInputMask]',
    standalone: true,
})
export class InputMaskDirective {

    @HostListener('input', ['$event'])
    onInput(event: Event) {
        const input = event.target as HTMLInputElement;
        let value = input.value.replace(/\D/g, '');

        switch (this.appInputMask) {
            case 'phone':
                value = this.applyPhoneMask(value);
                break;
            case 'cpf':
                value = this.applyCpfMask(value);
                break;
            case 'date':
                value = this.applyDateMask(value);
                break;
        }

        input.value = value;
    }

    private applyPhoneMask(value: string): string {
        if (value.length <= 10) {
            return value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        }
        return value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }

    private applyCpfMask(value: string): string {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    }

    private applyDateMask(value: string): string {
        return value.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    }
}
