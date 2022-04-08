import Tag from "./Tag";

class TagGroup {
    groupId: string;
    groupName: string;
    tags: Tag[] = [];

    constructor(groupName: string) {
        this.groupId = crypto.randomUUID();
        this.groupName = groupName;
    }

    addTag(tag: Tag) {
        this.tags.push(tag);
    }
}

export default TagGroup;
