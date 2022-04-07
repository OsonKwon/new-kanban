import {Box, Paper, Typography} from "@mui/material";

type Props = {
    projectId: string;
    title: string;
}

const BoardHeaderContainer = (props: Props) => {

    const {title, projectId} = props;
    return (
        <Box>
            <Paper style={{width: "100vw", height: "100px", margin: 5}}>
                <Typography>{title}</Typography>
                <Typography>project ID: {projectId}</Typography>
            </Paper>
        </Box>
    );
}
export default BoardHeaderContainer;
