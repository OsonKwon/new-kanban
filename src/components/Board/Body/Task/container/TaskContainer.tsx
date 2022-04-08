import { Grid, Paper, Typography} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import TagContainer from "../TaskProperty/TagContainer";
import Task from "../entity/Task";
import TaskImgContainer from "../TaskProperty/TaskImgContainer";
import TaskTextContainer from "../TaskProperty/TaskTextContainer";

type Props = {
    rowIndex: number;
    task: Task;
    onChangeTitle: (event: ChangeEvent<HTMLInputElement>, id: string, index: number) => void;
    onChangeDescription: (event: ChangeEvent<HTMLInputElement>, id: string, index: number) => void;
    onClickRemove: (taskId: string, rowNum: number) => void;
}
const TaskContainer = (props: Props) => {

    const {rowIndex, task, onChangeDescription, onChangeTitle, onClickRemove} = props;

    const [modalOpen, setModalOpen] = useState(false);


    const onClickTask = () => {
        setModalOpen(true);
    }

    // const onClose = () => {
    //     setModalOpen(false);
    // }

    return (
        <Paper
            sx={{
                p: 2,
                marginTop: 2,
                marginLeft: 2,
                marginRight: 2,
                maxWidth: 500,
                flexGrow: 1,
                padding: 1,
            }}
            onClick={onClickTask}
        >
            <Grid container spacing={5}>
                <TaskImgContainer/>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <TaskTextContainer
                            rowIndex={rowIndex}
                            card={task}
                            onChangeTitle={onChangeTitle}
                            onChangeDescription={onChangeDescription}
                        />
                        <Grid item>
                            {task.tagGroup ? (
                                <TagContainer
                                    tagGroup={task.tagGroup}
                                />
                            ) : null}
                        </Grid>
                        <Grid item>
                            <Typography sx={{cursor: 'pointer'}} variant="body2"
                                        onClick={() => onClickRemove(task.taskId, rowIndex)}>
                                Remove
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
            </Grid>
            {/*<TaskModalContainer task={task} open={modalOpen} onClose={onClose}/>*/}
        </Paper>

    );
};

export default TaskContainer;
