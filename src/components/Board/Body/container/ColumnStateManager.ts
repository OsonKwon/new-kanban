import Task from "../Task/entity/Task";
import TagGroup from "../Task/entity/TagGroup";

export enum ColumnActionType {
    changeTitle = 'changeTitle',
    changeDescription = 'changeDescription',
    addTask = 'addTask',
    replace = 'replace',
    remove = 'remove',

}
export interface ColumnAction {
    type: ColumnActionType;
    id?: string;
    index?: number;
    payload: unknown;
}

export const filterTasksByTag = (tasks: Task[], tagGroups: TagGroup[]) => {
    const columns: Task[][] = [];
    tagGroups.forEach((tagGroup) => {
        const tasksWithTag = tasks.filter((task) => task.tagGroups?.groupId === tagGroup.groupId);
        columns.push(tasksWithTag);
    })
    return columns;
}

export const columnReducer = (state: Task[][], action: ColumnAction) => {
    const {type, payload, id, index} = action;
    let newState: Task[][] = [...state];
    let newColumn: Task[] = [];
    switch (type) {
        case ColumnActionType.changeTitle:
            if (index === undefined) return state;
            newColumn = state[index].map((task) => {
                if (task.taskId === id) {
                    task.title = payload as string;
                }
                return task;
            })
            newState[index] = newColumn;
            return newState;

        case ColumnActionType.changeDescription:
            if (index === undefined) return state;
            newColumn = state[index].map((task) => {
                if (task.taskId === id) {
                    task.description = payload as string;
                }
                return task;
            })
            newState[index] = newColumn;
            return newState;

        case(ColumnActionType.replace):
            return payload as Task[][];

        case(ColumnActionType.addTask):
            if (index === undefined) return state;
            newColumn = [...state[index], payload as Task];
            newState[index] = newColumn;
            return newState;

        case (ColumnActionType.remove):
            if (index === undefined) return state;
            newState[index] = newState[index].filter((task) => task.taskId !== payload as string);
            return newState;
        default:
            return state;
    }
}

export const tasksReducer = (state: Task[], action: ColumnAction) => {
    const {type, payload, id} = action;
    let newState: Task[] = [];
    switch (type) {
        case ColumnActionType.changeTitle:
            newState = state.map((task) => {
                if (task.taskId === id) {
                    task.title = payload as string;
                }
                return task;
            })
            return newState;

        case ColumnActionType.changeDescription:
            newState = state.map((task) => {
                if (task.taskId === id) {
                    task.description = payload as string;
                }
                return task;
            })
            return newState;

        case ColumnActionType.addTask:
            newState = [...state, payload as Task];
            return newState;

        case ColumnActionType.replace:
            return payload as Task[];

        default:
            return state;
    }
}

export const findColumnByTagGroupId = (columns: Task[][], groupId: string) => {

    const foundColumn = columns.find((taskArr) => taskArr[0].tagGroups?.groupId === groupId);
    if (!foundColumn) throw new Error();
    const columnIndex = columns.indexOf(foundColumn);
    return { column: foundColumn, rowIndex: columnIndex };
}
