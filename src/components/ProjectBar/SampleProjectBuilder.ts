import Project from "./entity/Project";

export const makeSampleProject = (title: string) => {
    return new Project(crypto.randomUUID(), title);
}
