import { Component } from "../base/Component";
import { ICard } from "../../types";
import { ensureElement } from "../../utils/utils";


export abstract class Card<T extends ICard> extends Component<T> {
    protected _id!: string;
    protected _title: HTMLElement;
    protected _price: HTMLElement;

    protected constructor(
        container: HTMLElement
    ) {
        super(container);

        this._title = ensureElement<HTMLElement>(
            '.card__title',
            this._container, 
        );

        this._price = ensureElement<HTMLElement>(
            '.card__price',
            this._container,
        );
    }


    public set title(value: string) {
        this._title.textContent = value;
    }


    // public set price(value: number | null) {
    //     this._price.textContent = value !== null
    //     ? value + TEXT_PRICE_APPENDIX
    //     : TEXT_PRICE_UNAVAILABLE;
    // }
    public set price(value: string) {
        this._price.textContent = value;
    }

    public set id(value: string) {
        this._id = value;
    }
}