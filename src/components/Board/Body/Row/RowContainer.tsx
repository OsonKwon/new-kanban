import TaskContainer from "../Task/container/TaskContainer";
import Task from "../Task/entity/Task";
import {ChangeEvent} from "react";
import {Button, Grid} from "@mui/material";
import {Draggable} from "react-beautiful-dnd";
import TagGroup from "../Task/entity/TagGroup";

type Props = {
    onClickAdd: (index: number, tagGroup?: TagGroup) => void;
    onChangeTitle : (event:ChangeEvent<HTMLInputElement>, id: string, index: number) => void;
    onChangeDescription : (event:ChangeEvent<HTMLInputElement>, id: string, index: number) => void;
    tasks: Task[];
    rowIndex: number;
    onClickRemove: (taskId: string, rowNum: number) => void;
}

const RowContainer = (props: Props) => {

    const {rowIndex, tasks, onClickAdd, onClickRemove, onChangeTitle, onChangeDescription } = props;
    const tagGroup = tasks[0].tagGroup;
    if (!tagGroup) return <></>;

    return (
        <Grid
            container
            direction={"column"}
            style={{marginBottom: 2}}
        >
            {tasks.map((task, index) => {
                return (
                        <Draggable  key={task.taskId} draggableId={task.taskId} index={index}>
                            {provided => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <TaskContainer
                                        onClickRemove={onClickRemove}
                                        rowIndex={rowIndex}
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
            <Button onClick={() => onClickAdd(rowIndex, tagGroup)}>Add</Button>
        </Grid>
    );
}

export default RowContainer;
