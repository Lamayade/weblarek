import { Card } from "./Card";
import { ICardCatalog } from "../../types";
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
        protected events: IEvents,
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
            this.events.emit(
                'card:select',
                {id: this._id},
            );
        });
    }

    public set image(value: string) {
        this.setImage(
            this._image,
            `${CDN_URL}${value.replace('.svg', '.png')}`,
            this.title,
        );
    }

    public set category(value: TCategory) {
        this._category.textContent = value;
        this._category.className = 'card__category';
        this._category.classList.add(categoryMap[value]);
    }

    
}

