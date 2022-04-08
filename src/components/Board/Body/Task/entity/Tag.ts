
export default class Tag {
    tagId: string;
    name: string;
    parentId: string;

    constructor(parentId: string, name?: string) {
        this.tagId = crypto.randomUUID();
        this.parentId = parentId;
        this.name = name || 'enter name';
    }
}
