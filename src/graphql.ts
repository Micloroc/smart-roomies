
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface User {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}

export interface IQuery {
    user(id: string): User | Promise<User>;
}
