import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Modal extends Component<void> {
    protected _content: HTMLElement | null = null;
    private _modalContent: HTMLElement;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);
        this._modalContent = container.querySelector('.modal__content') as HTMLElement;

        this._container.addEventListener('click', (e) => {
            if (e.target === this._container) {
                this.close();
            }
        });

        const closeButton = this._container.querySelector('.modal__close');
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