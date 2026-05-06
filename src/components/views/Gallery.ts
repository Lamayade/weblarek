import { Component } from "../base/Component";
import { ERROR_NO_GALLERY_CONTAINER } from "../../utils/constants";

export interface IGallery {
    catalog: HTMLElement[];
}

export interface IGalleryData {
    catalog: HTMLElement[];
}

export class Gallery extends Component<IGalleryData> implements IGallery {
    private catalogElement: HTMLElement;

    constructor(
        container: HTMLElement,
    ) {
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