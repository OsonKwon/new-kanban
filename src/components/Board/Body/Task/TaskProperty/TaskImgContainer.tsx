import {ButtonBase, Grid} from "@mui/material";
import React from "react";
const TaskImgContainer = () => {

    return(
        <Grid item>
        <ButtonBase sx={{width: 120, height: 120}}>
            <img
                style={{
                    margin: 'auto',
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                }}
                alt="cat wearing sunglasses"
                src={'src/images/stylish-cat-resized.jpg'}
            />
        </ButtonBase>
    </Grid>
    )
}
export default TaskImgContainer;
