export class BaseModel {
    id: string;
    name: string;

    constructor(params: any = {}) {
        this.id = params.id;
        this.name = params.name;
    }
}
