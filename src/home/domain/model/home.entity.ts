import {Currency} from "../../../common/domain/model/Currency";
import {AggregateRoot} from "@nestjs/cqrs";
import {CreateHome} from "../command/create.home";
import {HomeCreated} from "../event/home.created";

export class Home extends AggregateRoot {
    public readonly id: string;
    private readonly _title: string;
    private readonly _description: string;
    private readonly _adminIds: string[];
    private readonly _userIds: string[];
    private readonly _currency: Currency;

    constructor(id: string, title: string, description: string, adminIds: string[], userIds: string[], currency: Currency) {
        super();
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

    static create(command: CreateHome) {
        const home = new this(command.id, command.description, command.description, command.adminIds, command.userIds, command.currency);
        this.apply(new HomeCreated(home.id));
        return home;
    }
}
