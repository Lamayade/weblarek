import { 
    Card,
} from "./Card";
import { 
    ICardCatalog,
    IProduct,
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
    protected _image: HTMLImageElement;
    protected _category: HTMLElement;
    onClick: (id: string) => void = () => {};

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

        container.addEventListener('click', () => {
            if (this._id) {
                this.onClick(this._id);
            }
        });
    }

    public set data(product: IProduct) {
        super.data = product;
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