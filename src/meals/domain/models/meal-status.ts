export class MealStatus {
    static readonly ENABLED = 'enabled';
    static readonly DELETED = 'deleted';

    private readonly _status: string;

    private constructor(status: string) {
        this._status = status;
    }

    get status(): string {
        return this._status;
    }

    static enabled() {
        return new this(this.ENABLED);
    }

    static deleted() {
        return new this(this.DELETED);
    }
}