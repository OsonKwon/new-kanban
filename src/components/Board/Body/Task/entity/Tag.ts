
export default class Tag {
    id: string;
    name: string;
    parentGroupId?: string;

    constructor(name?: string) {
        this.id = crypto.randomUUID();
        this.name = name || 'enter name';
    }
}
