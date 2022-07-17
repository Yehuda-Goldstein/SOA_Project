export class Message {
    
    constructor(
        public clientuniqueid?: string,
        public from?:string,
        public type?: string,
        public content?: String,
        public date?: Date
    ) { }
};