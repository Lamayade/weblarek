import { CardView, ICardActions } from "./Card";
import {
    categoryMap,
    TCategory,
    CDN_URL,
} from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { ICardView } from "./Card";


export interface ICardCatalogView extends ICardView {
    image: string;
    category: string;
}


export class CardCatalogView extends CardView<ICardCatalogView>{
    protected _imageElement: HTMLImageElement;
    protected _categoryElement: HTMLElement;

    constructor(
        container: HTMLElement,
        actions?: ICardActions,
    ) {
        super(container);
        
        this._imageElement = ensureElement<HTMLImageElement>(
            '.card__image',
            this._container,
        );

        this._categoryElement = ensureElement<HTMLElement>(
            '.card__category',
            this._container, 
        );

        if (actions?.onClick) {
            this._container.addEventListener('click', actions.onClick);
        }
    }

    public set image(value: string) {
        this.setImage(
            this._imageElement,
            `${CDN_URL}${value.replace('.svg', '.png')}`,
        );
    }

    public set category(value: TCategory) {
        this._categoryElement.textContent = value;
        this._categoryElement.className = 'card__category';
        this._categoryElement.classList.add(categoryMap[value]);
    }
}

