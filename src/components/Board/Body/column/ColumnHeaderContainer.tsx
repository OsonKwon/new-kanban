import {Paper, Typography} from "@mui/material";

type Props = {
    name: string;
}
const ColumnHeaderContainer = (props: Props) => {

    return (
        <Paper style={{width: 150, height: 25, margin: "auto", marginTop: 10, alignItems: "center"}} elevation={3}>
            <Typography variant={"subtitle1"} align={"center"} style={{marginTop: "auto", color: "navy"}}>{props.name.toUpperCase()}</Typography>

        </Paper>
    )
}

export default ColumnHeaderContainer;
