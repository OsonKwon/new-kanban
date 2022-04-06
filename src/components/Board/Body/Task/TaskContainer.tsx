import {ButtonBase, FormControl, Grid, Paper, TextField, Typography} from "@mui/material";
import moment from "moment";
import React, {ChangeEvent, useCallback, useState} from "react";
import TagContainer from "./TaskProperty/TagContainer";
import Tag from "./entity/Tag";
import Task from "./entity/Task";
import TaskImgContainer from "./TaskProperty/TaskImgContainer";
import TaskTextContainer from "./TaskProperty/TaskTextContainer";
import TaskModalContainer from "./TaskModalContainer";

type Props = {
    task: Task;
    onChangeTitle: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
    onChangeDescription: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
}
const TaskContainer = (props: Props) => {

    const {task, onChangeDescription, onChangeTitle} = props;

    const [modalOpen, setModalOpen] = useState(false);

    const sampleTag = new Tag('deployment');

    const onClickTask = () => {
        setModalOpen(true);
    }

    const onClose = () => {
        setModalOpen(false);
    }

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
                            card={task}
                            onChangeTitle={onChangeTitle}
                            onChangeDescription={onChangeDescription}
                        />
                        <Grid item>
                            <TagContainer
                                tag={sampleTag}
                            />
                        </Grid>
                        <Grid item>
                            <Typography sx={{cursor: 'pointer'}} variant="body2">
                                Remove
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
            </Grid>
            <TaskModalContainer task={task} open={modalOpen} onClose={onClose}/>
        </Paper>

    );
};

export default TaskContainer;
