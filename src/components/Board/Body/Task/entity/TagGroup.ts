import Tag from "./Tag";

class TagGroup {
    groupId: string;
    groupName: string;
    tags: Tag[];
    selected?: Tag;

    constructor(groupName: string, selected?: Tag, ...tag: Tag[]) {
        this.groupId = crypto.randomUUID();
        this.groupName = groupName;
        this.tags = tag;
    }

    addTag(...tag: Tag[]) {
        this.tags.push(...tag);
    }
}

export default TagGroup;
