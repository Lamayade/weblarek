import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export interface IModalView {
    open(content: HTMLElement): void;
    close(): void;
}

export class ModalView extends Component<IModalView> {
    protected content: HTMLElement | null = null;
    private modalContent: HTMLElement;

    public constructor(
        container: HTMLElement,
    ) {
        super(container);
        this.modalContent = ensureElement<HTMLElement>(
            '.modal__content',
            this.container,
        );

        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) {
                this.close();
            }
        });

        const closeButton = ensureElement<HTMLButtonElement>(
            '.modal__close',
            this.container,
        );
        closeButton.addEventListener('click', () => this.close());
    }

    public open(content: HTMLElement): void {
        this.modalContent.replaceChildren(content);
        this.container.classList.add('modal_active');
    }

    public close(): void {
        this.modalContent.replaceChildren();
        this.container.classList.remove('modal_active');
    }
}