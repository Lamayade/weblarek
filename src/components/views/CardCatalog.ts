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
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;

    public constructor(
        container: HTMLElement,
        actions?: ICardActions,
    ) {
        super(container);
        
        this.imageElement = ensureElement<HTMLImageElement>(
            '.card__image',
            this.container,
        );

        this.categoryElement = ensureElement<HTMLElement>(
            '.card__category',
            this.container, 
        );

        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick);
        }
    }

    protected set image(value: string) {
        this.setImage(
            this.imageElement,
            `${CDN_URL}${value.replace('.svg', '.png')}`,
        );
    }

    protected set category(value: TCategory) {
        this.categoryElement.textContent = value;
        this.categoryElement.className = 'card__category';
        this.categoryElement.classList.add(categoryMap[value]);
    }
}

