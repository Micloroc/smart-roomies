import {Currency} from "../../../common/domain/model/Currency";
import { IsNotEmpty } from 'class-validator';

export class CreateHomeCommand {
    public readonly id: string;

    @IsNotEmpty()
    public title: string;

    public description: string;
    public adminIds: string[];
    public userIds: string[];
    public currency: Currency;

    constructor(id: string, title: string, description: string, adminIds: string[], userIds: string[], currency: Currency) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.adminIds = adminIds;
        this.userIds = userIds;
        this.currency = currency;
    }
}