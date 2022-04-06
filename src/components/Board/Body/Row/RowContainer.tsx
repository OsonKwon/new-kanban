import TaskContainer from "../Task/TaskContainer";
import Task from "../Task/entity/Task";
import {ChangeEvent, useCallback, useMemo, useReducer, useState} from "react";
import {Button, Grid} from "@mui/material";
import {Draggable} from "react-beautiful-dnd";
import TagGroup from "../Task/entity/TagGroup";
import Tag from "../Task/entity/Tag";

type Props = {
    tagGroup: TagGroup;
}
enum ActionType {
    changeTitle = 'changeTitle',
    changeDescription = 'changeDescription',
    addCard = 'addCard',
}
interface CardAction {
    type: string;
    id?: string;
    payload: any;
}

const RowContainer = (props: Props) => {

    const sampleTag = (name: string) => new Tag(name);
    const sampleTagGroup = () => {
        const group = new TagGroup("process");
        group.tags = [sampleTag("preparing"), sampleTag("progressing"), sampleTag("finished")]
        return group;
    };
    const sampleTask = () => {
        const task = new Task(crypto.randomUUID(), 'test', 'test');
        task.tagGroups.push(sampleTagGroup());
        return task;
    };


    const sample = () => {
        return [sampleTask(), sampleTask(), sampleTask()];
    }

    const tasksReducer = (state: Task[], action: CardAction) => {
        const {type, payload, id} = action;
        let newState: Task[] = [];
        switch (type) {
            case ActionType.changeTitle:
                newState = state.map((task) => {
                    if (task.taskId === id) {
                        task.title = payload as string;
                        console.log('changed: ' ,task.title)
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

            case ActionType.addCard:
                newState = [...state, payload as Task];
                return newState;

            default:
                return state;
        }
    }
    const [tasks, dispatch] = useReducer(tasksReducer, sample());

    const onDragEnd = useCallback(() => {

    }, []);


    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        console.log(event.target.value);
        dispatch({type: ActionType.changeTitle, payload: event.target.value, id: id});
    }

    const onChangeDescription = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        dispatch({type: ActionType.changeDescription, payload: event.target.value, id: id});
    }

    const onClickAdd = () => {
        const card = new Task(crypto.randomUUID());
        dispatch({type: ActionType.addCard, payload: card});
    }

    return (
        <Grid
            container
            direction={"column"}
            style={{marginBottom: 2}}
        >

            {tasks.map((task, index) => {
                return (
                    <Draggable draggableId={task.taskId} index={index}>
                        {provided => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                            <TaskContainer
                                onChangeTitle={onChangeTitle}
                                onChangeDescription={onChangeDescription}
                                task={task}
                                key={task.taskId}
                            />
                            </div>
                        )}

                    </Draggable>
                );
            })}
            <Button onClick={onClickAdd}>Add</Button>
        </Grid>
    );
}

export default RowContainer;
