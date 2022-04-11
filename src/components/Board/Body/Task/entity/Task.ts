import TagGroup from "./TagGroup";
import Tag from "./Tag";

class Task {
    taskId: string;
    title: string;
    description: string;
    creationDate: number;
    dueDate?: number;
    tags: Tag[] = [];
    tagGroups: TagGroup[] = [];

    constructor(taskId: string, title?: string, description?: string, creationDate?: number) {
        this.taskId = taskId;
        this.title = title || 'untitled';
        this.description = description || "";
        this.creationDate = creationDate || Date.now();
    }

    addTagGroup(tagGroup: TagGroup) {
        if (this.tagGroups.includes(tagGroup)) {
            throw new Error('tag already exists in this task');
        }
        this.tagGroups.push(tagGroup);
    }

    addTag(tagGroupId: string, tag: Tag) {
        this.tagGroups.some((group) => {
            if (group.groupId === tagGroupId) {
                group.addTag(tag);
                return false;
            }
            else return true;
        })
    }

}

export default Task;
