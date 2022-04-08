import Task from "../entity/Task";
import {Box, Dialog, DialogContent, DialogTitle, Grid, Paper, TextField, Typography} from "@mui/material";
import React, {useState} from "react";

type Props = {
    task: Task;
    open: boolean;
    onClose: () => void;
}

const TaskModalContainer = (props: Props) => {
    const { task, open, onClose } = props;
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as string;
        setTitle(value);
    };

    const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as string;
        setDescription(value);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth={'lg'}>
            <DialogTitle>
                <TextField value={title} variant={"standard"} onChange={onChangeTitle} fullWidth/>
            </DialogTitle>
            <DialogContent>
                <Box minHeight={500}>
                    <Grid container direction={"column"}>
                        <Grid item>
                            <Typography>{task.tagGroups?.groupName} : </Typography>
                        </Grid>
                    </Grid>
                    <TextField
                        multiline
                        value={description}
                        variant={"standard"}
                        onChange={onChangeDescription}
                        fullWidth
                        InputProps={{disableUnderline: true}}
                    />
                </Box>
            </DialogContent>
        </Dialog>


    );
}

export default TaskModalContainer;
