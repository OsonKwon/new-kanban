import {Paper, Typography} from "@mui/material";

type Props = {
    name: string;
}
const RowHeadContainer = (props: Props) => {

    return (
        <Paper style={{width: 100, height: 40, margin: "auto", marginTop: 10}}>
            <Typography margin={'auto'}>{props.name}</Typography>
        </Paper>
    )
}

export default RowHeadContainer;
