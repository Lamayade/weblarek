import { Component } from "../base/Component";

export interface IGalleryView {
    catalog: HTMLElement[];
}

export class GalleryView extends Component<IGalleryView> {
    constructor(
        container: HTMLElement,
    ) {
        super(container);
    }

    set catalog(items: HTMLElement[]) {
        this._container.replaceChildren(...items);
    }
}