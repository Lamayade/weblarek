import { 
    Card,
} from "./Card";
import { 
    ICard,
    ICardCatalog,
    IProduct,
} from "../../types";
import {
    categoryMap,
    TCategory,
    CDN_URL,
} from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export class CardCatalog<T extends ICardCatalog> extends Card<T>{
    protected _image: HTMLImageElement;
    protected _category: HTMLElement;

    constructor(
        container: HTMLElement,
        private events: IEvents,
    ) {
        super(container);
        
        this._image =  ensureElement<HTMLImageElement>(
            '.card__image',
            this._container,
        );

        this._category = ensureElement<HTMLElement>(
            '.card__category',
            this._container, 
        );

        container.addEventListener('click', () => {
            this.events.emit('card:catalog-click');
        });
    }

    public set data(product: IProduct) {
        this.image = `${CDN_URL}${product.image.replace('.svg', '.png')}`;
        this.category = product.category as TCategory;
    }

    public set image(value: string) {
        this.setImage(
            this._image,
            value,
            this.title,
        );
    }

    public set category(value: TCategory) {
        this._category.textContent = value;
        this._category.className = 'card__category';
        this._category.classList.add(categoryMap[value]);
    }
}