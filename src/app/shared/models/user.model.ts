export class User {
    email: string;
    password: string;
    first_name: string;
    last_name: string;

    constructor(data: any) {
        if (data) {
            this.email = data.name;
            this.password = data.password;
            this.first_name = data.first_name;
            this.last_name = data.last_name;
        }
        else {
            this.email = '';
            this.password = '';
            this.first_name = '';
            this.last_name = '';
        }
    }
}