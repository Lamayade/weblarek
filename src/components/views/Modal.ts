import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { findElement } from "../../utils/utils";
import {
    ERROR_NO_MODAL_CONTENT,
    ERROR_NO_MODAL_CLOSE,
} from "../../utils/constants";

export class Modal extends Component<void> {
    protected _content: HTMLElement | null = null;
    private _modalContent: HTMLElement;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);
        this._modalContent = findElement<HTMLElement>(
            this._container,
            '.modal__content',
            ERROR_NO_MODAL_CONTENT
        );

        this._container.addEventListener('click', (e) => {
            if (e.target === this._container) {
                this.close();
            }
        });

        const closeButton = findElement<HTMLButtonElement>(
            this._container,
            '.modal__close',
            ERROR_NO_MODAL_CLOSE
        );
        if (closeButton) {
            closeButton.addEventListener('click', () => this.close());
        }
    }

    open(content: HTMLElement): void {
        this._content = content;
        this._modalContent.replaceChildren(content);
        this._container.classList.add('modal_active');
        this.events.emit('modal:opened');
    }

    close(): void {
        this._content = null;
        this._modalContent.replaceChildren();
        this._container.classList.remove('modal_active');
        this.events.emit('modal:closed');
    }
}