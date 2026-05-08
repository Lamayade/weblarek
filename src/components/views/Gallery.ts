import { Component } from "../base/Component";

export interface IGalleryView {
    catalog: HTMLElement[];
}

export class GalleryView extends Component<IGalleryView> {
    public constructor(
        container: HTMLElement,
    ) {
        super(container);
    }

    protected set catalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}