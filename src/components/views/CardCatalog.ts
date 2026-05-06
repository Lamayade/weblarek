import { 
    Card,
    ICardActions,
    ICard,
} from "./Card";
import {
    categoryMap,
    TCategory,
    CDN_URL,
} from "../../utils/constants";
import { ensureElement } from "../../utils/utils";


export interface ICardCatalog extends ICard {
    image: string;
    category: string;
}


export class CardCatalog<T extends ICardCatalog> extends Card<T>{
    protected _image: HTMLImageElement;
    protected _category: HTMLElement;

    constructor(
        container: HTMLElement,
        actions?: ICardActions,
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

        if (actions?.onClick) {
            this._container.addEventListener('click', actions.onClick);
        }

                // 'card:select',
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

