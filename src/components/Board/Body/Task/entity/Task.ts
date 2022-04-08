import TagGroup from "./TagGroup";
import Tag from "./Tag";

class Task {
    taskId: string;
    title: string;
    description: string;
    creationDate: number;
    dueDate?: number;
    tags: Tag[] = [];
    tagGroups?: TagGroup[] = [];

    constructor(taskId: string, title?: string, description?: string, creationDate?: number) {
        this.taskId = taskId;
        this.title = title || 'untitled';
        this.description = description || "";
        this.creationDate = creationDate || Date.now();
    }

}

export default Task;
