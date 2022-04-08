import TaskContainer from "../Task/container/TaskContainer";
import Task from "../Task/entity/Task";
import {ChangeEvent, useMemo, useReducer} from "react";
import {Button, Grid} from "@mui/material";
import {Draggable} from "react-beautiful-dnd";
import TagGroup from "../Task/entity/TagGroup";
import {tasksReducer} from "../container/ColumnStateManager";
import {taskSample} from "../container/SampleBuilder";

type Props = {
    onClickAdd: (index: number, tagGroup?: TagGroup) => void;
    onChangeTitle : (event:ChangeEvent<HTMLInputElement>, id: string, index: number) => void;
    onChangeDescription : (event:ChangeEvent<HTMLInputElement>, id: string, index: number) => void;
    columnIndex: number;
    onClickRemove: (taskId: string, columnNum: number) => void;
    tagGroup: TagGroup;
}

const ColumnContainer = (props: Props) => {

    const { columnIndex, tagGroup, onClickAdd, onClickRemove, onChangeTitle, onChangeDescription } = props;

    const sample = useMemo(() => [taskSample(`${tagGroup.groupName} sample`, tagGroup)], []);

    const [tasks, setTasks] = useReducer(tasksReducer, sample);
    return (
        <Grid
            container
            direction={"column"}
            style={{marginBottom: 2}}
        >
            {tasks.map((task, index) => {
                return (
                        <Draggable key={task.taskId} draggableId={task.taskId} index={index}>
                            {provided => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <TaskContainer
                                        onClickRemove={onClickRemove}
                                        columnIndex={columnIndex}
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
            <Button onClick={() => onClickAdd(columnIndex, tagGroup)}>Add</Button>
        </Grid>
    );
}

export default ColumnContainer;
