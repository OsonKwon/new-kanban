import TagGroup from "../Task/entity/TagGroup";
import Task from "../Task/entity/Task";
import Tag from "../Task/entity/Tag";

export const taskSample = (name: string, group: TagGroup) => {
    const sample = new Task(crypto.randomUUID(), name);
    sample.tagGroups = group;
    return sample;
}
export const sampleProcessTagGroup = (name: string) => {
    const group = new TagGroup(name);

    const todo = new Tag(group.groupId, 'todo');
    const inDiscussion = new Tag(group.groupId, 'in discussion');
    const inProgress = new Tag(group.groupId, 'in progress');
    const finished = new Tag(group.groupId, 'finished');

    group.tags.push(todo, inDiscussion, inProgress, finished);
    return group;
};
