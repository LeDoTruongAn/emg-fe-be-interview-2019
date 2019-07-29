
export class UserModel1 {
    constructor(
        public id?: string,
        public userName?: string,
        public firstName?: string,
        public lastName?: string,
        public createdDate?: string,
        public index?: number
    ) {
        this.id = id ? id : null;
        this.userName = userName ? userName : null;
        this.firstName = firstName ? firstName : null;
        this.lastName = lastName ? lastName : null;
        this.createdDate = createdDate ? createdDate : null;
        this.index = index ? index : 0;
    }

}

export class UserModel {
    id: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    createdDate: string;
    constructor(params: any = {}) {
        this.id = params.id;
        this.userName = params.userName;
        this.password = params.password;
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.createdDate = params.createdDate;
    }
}
