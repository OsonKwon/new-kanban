import TagGroup from "./TagGroup";

class Task {
    taskId: string;
    title: string;
    description: string;
    creationDate: number;
    tagGroup?: TagGroup;

    constructor(taskId: string, title?: string, description?: string, creationDate?: number) {
        this.taskId = taskId;
        this.title = title || 'untitled';
        this.description = description || "";
        this.creationDate = creationDate || Date.now();
    }

}

export default Task;
