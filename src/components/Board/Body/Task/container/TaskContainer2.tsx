import Task from "../entity/Task";
import React, {ChangeEvent, useCallback, useState} from "react";
import {Grid, Paper, Typography} from "@mui/material";
import TaskImgContainer from "../TaskProperty/TaskImgContainer";
import TaskTextContainer from "../TaskProperty/TaskTextContainer";
import TagContainer from "../TaskProperty/TagContainer";
import TagGroup from "../entity/TagGroup";
import {map} from "lodash";

type Props = {
    columnGroup: TagGroup;
    rowGroup: TagGroup;
    columnIndex: number;
    rowIndex: number;
    onChangeTitle: (event: ChangeEvent<HTMLInputElement>, id: string, index: number) => void;
    onChangeDescription: (event: ChangeEvent<HTMLInputElement>, id: string, index: number) => void;
    onClickRemove: (taskId: string, columnNum: number) => void;
    tasks : Task[];
}

const TaskContainer2 = (props: Props) => {

    const {columnIndex, tasks, onChangeDescription, onChangeTitle, onClickRemove} = props;

    const [modalOpen, setModalOpen] = useState(false);


    const onClickTask = useCallback(() => {
        setModalOpen(true);
    }, []);

    // const onClose = () => {
    //     setModalOpen(false);
    // }

    return (
        <>
        {tasks.map((task, index) => {
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
                    elevation={3}
                    onClick={onClickTask}
                >
                    <Grid container spacing={5}>
                        <TaskImgContainer/>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <TaskTextContainer
                                    columnIndex={columnIndex}
                                    card={task}
                                    onChangeTitle={onChangeTitle}
                                    onChangeDescription={onChangeDescription}
                                />
                                <Grid item>
                                    {task.tagGroups.length ? (
                                        <TagContainer
                                            tagGroups={task.tagGroups}
                                        />
                                    ) : null}
                                </Grid>
                                <Grid item>
                                    <Typography sx={{cursor: 'pointer'}} variant="body2"
                                                onClick={() => onClickRemove(task.taskId, columnIndex)}>
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
            })}
            <Paper
                sx={{
                    p: 2,
                    marginTop: 2,
                    marginLeft: 2,
                    marginRight: 2,
                    width: 500,
                    height: 50,
                    flexGrow: 1,
                    padding: 1,
                }}
                elevation={3}
            >
                add
            </Paper>
        </>
    );
};

export default TaskContainer2;
