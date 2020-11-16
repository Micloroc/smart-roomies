import {Currency} from "../../../common/domain/model/Currency";

export class Home {
    public readonly id: string;
    private _title: string;
    private _description: string;
    private _adminIds: string[];
    private _userIds: string[];
    private _currency: Currency;

    constructor(id: string, title: string, description: string, adminIds: string[], userIds: string[], currency: Currency) {
        this.id = id;
        this._title = title;
        this._description = description;
        this._adminIds = adminIds;
        this._userIds = userIds;
        this._currency = currency;
    }

    get title(): string {
        return this._title;
    }

    get description(): string {
        return this._description;
    }

    get adminIds(): string[] {
        return this._adminIds;
    }

    get userIds(): string[] {
        return this._userIds;
    }

    get currency(): Currency {
        return this._currency;
    }
}
