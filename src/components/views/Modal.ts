import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export interface IModalView {
    open(content: HTMLElement): void;
    close(): void;
}

export class ModalView extends Component<IModalView> {
    protected _content: HTMLElement | null = null;
    private _modalContent: HTMLElement;

    constructor(
        container: HTMLElement,
    ) {
        super(container);
        this._modalContent = ensureElement<HTMLElement>(
            '.modal__content',
            this._container,
        );

        this._container.addEventListener('click', (e) => {
            if (e.target === this._container) {
                this.close();
            }
        });

        const closeButton = ensureElement<HTMLButtonElement>(
            '.modal__close',
            this._container,
        );
        closeButton.addEventListener('click', () => this.close());
    }

    open(content: HTMLElement): void {
        this._modalContent.replaceChildren(content);
        this._container.classList.add('modal_active');
    }

    close(): void {
        this._modalContent.replaceChildren();
        this._container.classList.remove('modal_active');
    }
}