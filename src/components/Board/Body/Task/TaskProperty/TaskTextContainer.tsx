import {FormControl, Grid, TextField, Typography} from "@mui/material";
import moment from "moment";
import React, {ChangeEvent, useCallback, useState} from "react";
import Task from "../entity/Task";

type Props = {
    columnIndex: number;
    card: Task;
    onChangeTitle: (event: ChangeEvent<HTMLInputElement>, id: string, index: number) => void;
    onChangeDescription: (event: ChangeEvent<HTMLInputElement>, id: string, index: number) => void;
}
const TaskTextContainer = (props: Props) => {

    const { columnIndex, card, onChangeTitle, onChangeDescription } = props;

    const [readOnly, setReadOnly] = useState(false);

    const onDoubleClick = useCallback(() => {
        setReadOnly(prev => !prev);
    }, []);

    const onEnter = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        return event.key === 'Enter' ? setReadOnly(prev => !prev) : undefined;
    }, []);

    return (
        <Grid item xs>
            <FormControl
                onDoubleClick={onDoubleClick}
                onKeyPress={event => onEnter(event)}
            >
                <TextField
                    variant="standard"
                    InputProps={{readOnly: readOnly}}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeTitle(event, card.taskId, columnIndex)}
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
                    onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeDescription(event, card.taskId, columnIndex)}
                />
            </FormControl>
            <Typography variant="body2" color="text.secondary">
                {moment(card.creationDate).calendar()}
            </Typography>
        </Grid>
    );
}

export default TaskTextContainer;
