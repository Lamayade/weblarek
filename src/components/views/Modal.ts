import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Modal extends Component<void> {
    protected _content: HTMLElement | null = null;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);
        this.container.classList.add('modal_open');

        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) {
                this.close();
            }
        });

        const closeButton = this.container.querySelector('.modal__close');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.close());
        }
    }

    open(content: HTMLElement): void {
        this._content = content;
        this.container.append(content);
        this.container.classList.add('modal_open');
        this.events.emit('modal:opened');
    }

    close(): void {
        this._content?.remove();
        this._content = null;
        this.container.classList.remove('modal_open');
        this.events.emit('modal:closed');
    }
}