import TagGroup from "../Task/entity/TagGroup";
import Task from "../Task/entity/Task";
import Tag from "../Task/entity/Tag";

export const taskSample = (name: string, group: TagGroup) => {
    const sample = new Task(crypto.randomUUID(), name);
    sample.addTagGroup(group);
    return sample;
}

export const sampleProcessTagGroup = (name: string) => {
    const group = new TagGroup(name);

    const todo = new Tag(group.groupId, 'todo');
    const inDiscussion = new Tag(group.groupId, 'in discussion');
    const inProgress = new Tag(group.groupId, 'in progress');
    const finished = new Tag(group.groupId, 'finished');

    group.addTag(todo, inDiscussion, inProgress, finished);
    group.selected = todo;
    return group;
};

export const sampleImportanceTag = () => {

    const group = new TagGroup("importance level");

    const low = new Tag(group.groupId, 'low');
    const middle = new Tag(group.groupId, 'middle');
    const high = new Tag(group.groupId, 'high');

    group.addTag(low, middle, high);

    return group;
}
