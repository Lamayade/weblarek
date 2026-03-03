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
    errorNoCardImage,
    errorNoCardCategory,
} from "../../utils/constants";


export class CardCatalog<T extends ICardCatalog> extends Card<T> {
    private _image: HTMLImageElement;
    private _category: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        
        const imageElement = this.container.querySelector<HTMLImageElement>(
            '.card__image'
        );
        if (imageElement === null) {
            throw new Error(errorNoCardImage);
        }
        this._image = imageElement;

        const categoryElement = this.container.querySelector<HTMLElement>(
            '.card__category'
        );
        if (categoryElement === null) {
            throw new Error(errorNoCardCategory);
        }
        this._category = categoryElement;
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