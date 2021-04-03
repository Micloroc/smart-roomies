import {Column} from 'typeorm';

export class ShoppingItemStatus {
    static readonly CHECKED_OUT = 'checked_out';
    static readonly PENDING = 'pending';

    @Column({name: 'status'})
    public readonly _status: string;

    private constructor(status: string) {
        this._status = status;
    }

    static checkedOut() {
        return new this(this.CHECKED_OUT);
    }

    static pending() {
        return new this(this.PENDING);
    }
}