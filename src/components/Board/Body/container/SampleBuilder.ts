import TagGroup from "../Task/entity/TagGroup";
import Task from "../Task/entity/Task";

export const taskSample = (name: string, group: TagGroup) => {
    const sample = new Task(crypto.randomUUID(), name);
    sample.tagGroup = group;
    return sample;
}
export const sampleTagGroup = (name: string) => {
    const group = new TagGroup(name);
    return group;
};
