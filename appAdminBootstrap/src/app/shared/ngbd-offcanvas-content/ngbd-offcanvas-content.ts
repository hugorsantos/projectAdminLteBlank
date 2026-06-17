import { Component, inject, Input } from "@angular/core";
import { NgbActiveOffcanvas } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-offcanvas',
    imports: [],
    templateUrl: './ngbd-offcanvas-content.html',
    styleUrl: './ngbd-offcanvas-content.css',
})
export class NgbdOffcanvasContent {
    activeOffcanvas = inject(NgbActiveOffcanvas);
    @Input() name: string | undefined;
}
