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