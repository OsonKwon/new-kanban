
export default class Tag {
    id: string;
    name: string;
    parentId: string;

    constructor(parentId: string, name?: string) {
        this.id = crypto.randomUUID();
        this.parentId = parentId;
        this.name = name || 'enter name';
    }
}
