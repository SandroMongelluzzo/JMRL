export interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    token: string;
    admin:boolean;
}
/*/ //User 2.0
export interface User {
    id: number;
    username: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    password: string;
    token: string;
}
/*/