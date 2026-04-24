import { 
    Card,
} from "./Card";
import { 
    ICardCatalog,
} from "../../types";
import {
    categoryMap,
    TCategory,
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
            this._container,
            '.card__image',
            ERROR_NO_CARD_IMAGE
        );

        this._category = findElement<HTMLElement>(
            this._container,
            '.card__category',
            ERROR_NO_CARD_CATEGORY
        );
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