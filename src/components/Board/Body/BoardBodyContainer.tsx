import {useState} from "react";
import RowContainer from "./Row/RowContainer";
import {Button, Grid} from "@mui/material";
import RowHeadContainer from "./Row/RowHeadContainer";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import Tag from "./Task/entity/Tag";
import TagGroup from "./Task/entity/TagGroup";

type Props = {
    projectId: string;
}

const BoardBodyContainer = (props: Props) => {

    const makeSample = () => new TagGroup("process");

    const [tagGroups, setTagGroups] = useState<TagGroup[]>([makeSample(), makeSample(), makeSample()]);

    const onDragEnd = (result: DropResult) => {

        if (!result.destination) return;

        if (result.destination.index === result.destination.index) return;

    }
    return (
        <div>
            <Grid container direction={'row'}>
                <DragDropContext onDragEnd={onDragEnd}>
            {tagGroups.map((tagGroup, index) => {
                return (
                    <Droppable droppableId={tagGroup.groupId}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                            <Grid
                            item
                            xs={'auto'}
                            key={tagGroup.groupId}
                            spacing={1}
                            style={{marginLeft: 4, marginTop: 4, marginBottom: 4, backgroundColor: "lightgray"}}

                        >
                            <RowHeadContainer name={tagGroup.groupName}/>
                            <RowContainer tagGroup={tagGroup}/>
                        </Grid>
                                {provided.placeholder}
                            </div>
                            )}
                    </Droppable>
                );
            })}
                </DragDropContext>
            </Grid>
        </div>
    );
}
export default BoardBodyContainer;
