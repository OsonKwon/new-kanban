import Task from "../Task/entity/Task";
import TagGroup from "../Task/entity/TagGroup";

export enum TaskActionType {
    changeTitle = 'changeTitle',
    changeDescription = 'changeDescription',
    addTask = 'addTask',
    replace = 'replace',
    remove = 'remove',

}
export interface RowAction {
    type: string;
    id?: string;
    index?: number;
    payload: unknown;
}

export const filterTasksByTag = (tasks: Task[], tagGroups: TagGroup[]) => {
    const row: Task[][] = [];
    tagGroups.forEach((tagGroup) => {
        const tasksWithTag = tasks.filter((task) => task.tagGroup?.groupId === tagGroup.groupId);
        row.push(tasksWithTag);
    })
    return row;
}

export const rowReducer = (state: Task[][], action: RowAction) => {
    const {type, payload, id, index} = action;
    let newState: Task[][] = [...state];
    let newRow: Task[] = [];
    switch (type) {
        case TaskActionType.changeTitle:
            if (index === undefined) return state;
            newRow = state[index].map((task) => {
                if (task.taskId === id) {
                    task.title = payload as string;
                }
                return task;
            })
            newState[index] = newRow;
            return newState;

        case TaskActionType.changeDescription:
            if (index === undefined) return state;
            newRow = state[index].map((task) => {
                if (task.taskId === id) {
                    task.description = payload as string;
                }
                return task;
            })
            newState[index] = newRow;
            return newState;

        case(TaskActionType.replace):
            return payload as Task[][];

        case(TaskActionType.addTask):
            if (index === undefined) return state;
            newRow = [...state[index], payload as Task];
            newState[index] = newRow;
            return newState;

        case (TaskActionType.remove):
            if (index === undefined) return state;
            newState[index] = newState[index].filter((task) => task.taskId !== payload as string);
            return newState;
        default:
            return state;
    }
}

export const tasksReducer = (state: Task[], action: RowAction) => {
    const {type, payload, id} = action;
    let newState: Task[] = [];
    switch (type) {
        case TaskActionType.changeTitle:
            newState = state.map((task) => {
                if (task.taskId === id) {
                    task.title = payload as string;
                }
                return task;
            })
            return newState;

        case TaskActionType.changeDescription:
            newState = state.map((task) => {
                if (task.taskId === id) {
                    task.description = payload as string;
                }
                return task;
            })
            return newState;

        case TaskActionType.addTask:
            newState = [...state, payload as Task];
            return newState;

        case TaskActionType.replace:
            return payload;

        default:
            return state;
    }
}

export const findRowByTagGroupId = (rows: Task[][], groupId: string) => {

    const foundRow = rows.find((taskArr) => taskArr[0].tagGroup?.groupId === groupId);
    if (!foundRow) throw new Error();
    const rowIndex = rows.indexOf(foundRow);
    return { row: foundRow, rowIndex: rowIndex };
}
