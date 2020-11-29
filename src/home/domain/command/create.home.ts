import {Currency} from '../../../common/domain/model/currency';
import {IsNotEmpty, IsUUID} from 'class-validator';

export class CreateHome {
    @IsUUID(4)
    @IsNotEmpty()
    id: string;
    @IsNotEmpty()
    title: string;
    description: string;
    @IsUUID(4, {each: true})
    @IsNotEmpty()
    adminIds: string[];
    @IsUUID(4, {each: true})
    @IsNotEmpty()
    userIds: string[];
    @IsNotEmpty()
    creatorId: string;
    @IsNotEmpty()
    currency: Currency;
}