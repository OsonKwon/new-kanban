import {FormControl, Grid, TextField, Typography} from "@mui/material";
import moment from "moment";
import React, {ChangeEvent, useCallback, useState} from "react";
import Task from "../entity/Task";

type Props = {
    card: Task;
    onChangeTitle: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
    onChangeDescription: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
}
const TaskTextContainer = (props: Props) => {

    const { card, onChangeTitle, onChangeDescription } = props;

    const [readOnly, setReadOnly] = useState(false);

    const onDoubleClick = useCallback(() => {
        setReadOnly(prev => !prev);
    }, [readOnly]);

    const onEnter = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        return event.key === 'Enter ' ? setReadOnly(prev => !prev) : undefined;
    }, [readOnly]);

    return (
        <Grid item xs>
            <FormControl
                onDoubleClick={onDoubleClick}
                onKeyPress={event => onEnter(event)}
            >
                <TextField
                    variant="standard"
                    InputProps={{readOnly: readOnly}}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeTitle(event, card.taskId)}
                    value={card.title}
                >
                </TextField>
                <TextField
                    multiline
                    variant="standard"
                    size={"small"}
                    InputProps={{
                        disableUnderline: true,
                        readOnly: readOnly
                    }}
                    value={card.description}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeDescription(event, card.taskId)}
                />
            </FormControl>
            <Typography variant="body2" color="text.secondary">
                {moment(card.creationDate).calendar()}
            </Typography>
        </Grid>
    );
}

export default TaskTextContainer;
