import {ChangeEvent, useMemo, useReducer, useState} from "react";
import RowContainer from "../Row/RowContainer";
import {Grid} from "@mui/material";
import {DragDropContext, DraggableLocation, Droppable, DropResult} from "react-beautiful-dnd";
import Tag from "../Task/entity/Tag";
import TagGroup from "../Task/entity/TagGroup";
import Task from "../Task/entity/Task";
import _ from "lodash";
import {ActionType, filterTasksByTag, findRowByTagGroupId, rowReducer, tasksReducer} from "./RowStateManager";
import {sampleTagGroup, taskSample} from "./SampleBuilder";

type Props = {
    projectId: string;
}

const BoardBodyContainer = (props: Props) => {

    const [tagGroups, setTagGroups] = useState<TagGroup[]>([sampleTagGroup("Todo"), sampleTagGroup("in discussion"), sampleTagGroup("in progress"), sampleTagGroup("finished")]);

    const sampleTasks = [taskSample("11111", tagGroups[0]), taskSample("22222", tagGroups[1]), taskSample("33333", tagGroups[2]), taskSample("44444", tagGroups[3])];
    //const [allTasks, setAllTasks] = useReducer(tasksReducer, sampleTasks);
    //const initialRow = useMemo(() => filterTasksByTag(allTasks, tagGroups), [allTasks]);
    const initialRow = filterTasksByTag(sampleTasks, tagGroups);
    const [rows, setRows] = useReducer(rowReducer, initialRow);

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>, id: string, index: number) => {
        setRows({type: ActionType.changeTitle, payload: event.target.value, id: id, index: index});
    }

    const onChangeDescription = (event: ChangeEvent<HTMLInputElement>, id: string, index: number) => {
        setRows({type: ActionType.changeDescription, payload: event.target.value, id: id, index: index});
    }

    const onClickAdd = (index: number, tagGroup?: TagGroup ) => {
        const task = new Task(crypto.randomUUID(), "title", "desc");
        task.tagGroup = tagGroup;
        setRows({type: ActionType.addTask, payload: task});
    }

    const reorder = (list: Task[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const move = (
        source: Task[],
        destination: DraggableLocation,
        droppableSource: DraggableLocation,
        droppableDestination: DraggableLocation
    ) => {

        return;
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;

        const from = source.droppableId;
        const to = destination.droppableId;
        const { row, rowIndex } = findRowByTagGroupId(rows, from || to);
        if (!row) return;
        if (from === to) {
            const newRowOrder = reorder(row, source.index, destination.index);
            const newRows = [...rows];
            newRows[rowIndex] = newRowOrder;
            setRows({payload: newRows, type: ActionType.replace});
        } else {

        }
    }

    return (
        <div>
            <Grid container direction={'row'}>
                <DragDropContext onDragEnd={onDragEnd}>
            {rows.length ? (rows.map((row, index) => {
                const tagGroup = row[0].tagGroup;
                return (
                    <Droppable droppableId={tagGroup?.groupId || 'no tag'}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <Grid
                                    item
                                    xs={'auto'}
                                    key={tagGroup?.groupId || 'no tag'}
                                    style={{
                                        marginLeft: 4,
                                        marginTop: 4,
                                        marginBottom: 4,
                                        backgroundColor: "lightgray"
                                    }}
                                >
                                    <RowContainer
                                        rowIndex={index}
                                        onChangeDescription={onChangeDescription}
                                        onChangeTitle={onChangeTitle}
                                        onClickAdd={onClickAdd}
                                        tasks={row}
                                    />
                                </Grid>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                );
            })): null}
                </DragDropContext>
            </Grid>
        </div>
    );
}

export default BoardBodyContainer;
