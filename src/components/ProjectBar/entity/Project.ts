import Tag from "../../Board/Body/Task/entity/Tag";

export default class Project {
    projectId: string;
    tags: Tag[] = [];
    creationDate: number;
    title: string;
    description: string;

    constructor(id: string, title?: string, description?: string, tags?: Tag[]) {
        this.projectId = id;
        this.title = title || "untitled";
        this.description = description || "no contents yet";
        this.tags = tags || [];
        this.creationDate = Date.now();
    }

    addTag(tag: Tag) {
        this.tags.push(tag);
    }

    addTags(tags: Tag[]) {
        tags.forEach(tag => this.addTag(tag));
    }
}
