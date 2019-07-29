export class IUserLoginModel {
    userName: string;
    password: string;
    constructor(params: any = {}) {
        this.userName = params.userName;
        this.password = params.password;
    }
}


export class IUserRegisterModel {
    id: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    constructor(params: any = {}) {
        this.id = params.id;
        this.userName = params.userName;
        this.password = params.password;
        this.firstName = params.firstName;
        this.lastName = params.lastName;
    }
}
