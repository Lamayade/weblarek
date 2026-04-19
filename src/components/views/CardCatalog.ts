import { 
    Card,
} from "./Card";
import { 
    ICardCatalog,
} from "../../types";
import {
    categoryMap,
    TCategory,
    CDN_URL,
    ERROR_NO_CARD_IMAGE,
    ERROR_NO_CARD_CATEGORY,
} from "../../utils/constants";
import { findElement } from "../../utils/utils";


export class CardCatalog<T extends ICardCatalog> extends Card<T> {
    private _image: HTMLImageElement;
    private _category: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        
        this._image = findElement<HTMLImageElement>(
            this.container,
            '.card__image',
            ERROR_NO_CARD_IMAGE
        );

        this._category = findElement<HTMLElement>(
            this.container,
            '.card__category',
            ERROR_NO_CARD_CATEGORY
        );
    }

    protected set image(value: string) {
        this.setImage(
            this._image,
            `${CDN_URL}${value}`,
            this.title,
        );
    }

    protected set category(value: TCategory) {
        this._category.textContent = value;
        this._category.className = 'card__category';
        this._category.classList.add(categoryMap[value]);
    }
}