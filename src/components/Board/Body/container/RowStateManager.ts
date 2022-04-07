import Task from "../Task/entity/Task";
import TagGroup from "../Task/entity/TagGroup";
import _ from "lodash";
import Tag from "../Task/entity/Tag";

export enum ActionType {
    changeTitle = 'changeTitle',
    changeDescription = 'changeDescription',
    addTask = 'addTask',
    replace = 'replace'
}
export interface RowAction {
    type: string;
    id?: string;
    index?: number;
    payload: any;
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
        case ActionType.changeTitle:
            if (index === undefined) return state;
            newRow = state[index].map((task) => {
                if (task.taskId === id) {
                    task.title = payload as string;
                }
                return task;
            })
            newState[index] = newRow;
            return newState;

        case ActionType.changeDescription:
            if (index === undefined) return state;
            newRow = state[index].map((task) => {
                if (task.taskId === id) {
                    task.description = payload as string;
                }
                return task;
            })
            newState[index] = newRow;
            return newState;

        case(ActionType.replace):
            return payload as Task[][];

        case(ActionType.addTask):

        default:
            return state;
    }
}

export const tasksReducer = (state: Task[], action: RowAction) => {
    const {type, payload, id} = action;
    let newState: Task[] = [];
    switch (type) {
        case ActionType.changeTitle:
            newState = state.map((task) => {
                if (task.taskId === id) {
                    task.title = payload as string;
                }
                return task;
            })
            return newState;

        case ActionType.changeDescription:
            newState = state.map((task) => {
                if (task.taskId === id) {
                    task.description = payload as string;
                }
                return task;
            })
            return newState;

        case ActionType.addTask:
            newState = [...state, payload as Task];
            return newState;

        case ActionType.replace:
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
