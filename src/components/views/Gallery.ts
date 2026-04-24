import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IGallery } from "../../types";
import { ERROR_NO_GALLERY_CONTAINER } from "../../utils/constants";

export class Gallery extends Component<IGallery> {
    private catalogElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        if (!container.classList.contains('gallery')) {
            throw new Error(ERROR_NO_GALLERY_CONTAINER);
        }
        this.catalogElement = this._container;
    }

    set catalog(items: HTMLElement[]) {
        this.catalogElement.replaceChildren(...items);
    }
}