import {ChangeEvent, useMemo, useReducer, useState} from "react";
import RowContainer from "../Row/RowContainer";
import {Grid} from "@mui/material";
import {DragDropContext, DraggableLocation, Droppable, DropResult} from "react-beautiful-dnd";
import TagGroup from "../Task/entity/TagGroup";
import Task from "../Task/entity/Task";
import {filterTasksByTag, rowReducer, TaskActionType} from "./RowStateManager";
import {sampleTagGroup, taskSample} from "./SampleBuilder";

type Props = {
    projectId: string;
}

const BoardBodyContainer = (props: Props) => {

    const sampleGroups = useMemo(() => {
        return [sampleTagGroup("Todo"), sampleTagGroup("in discussion"), sampleTagGroup("in progress"), sampleTagGroup("finished")]
    }, [])

    const [tagGroups, setTagGroups] = useState<TagGroup[]>(sampleGroups);

    const sampleTasks = [taskSample("11111", tagGroups[0]), taskSample("22222", tagGroups[1]), taskSample("33333", tagGroups[2]), taskSample("44444", tagGroups[3])];

    const initialRow = filterTasksByTag(sampleTasks, tagGroups);
    const [rows, setRows] = useReducer(rowReducer, initialRow);

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>, id: string, index: number) => {
        setRows({type: TaskActionType.changeTitle, payload: event.target.value, id: id, index: index});
    }

    const onChangeDescription = (event: ChangeEvent<HTMLInputElement>, id: string, index: number) => {
        setRows({type: TaskActionType.changeDescription, payload: event.target.value, id: id, index: index});
    }

    const onClickAdd = (index: number, tagGroup?: TagGroup ) => {
        const task = new Task(crypto.randomUUID(), "title", "desc");
        task.tagGroup = tagGroup;
        setRows({type: TaskActionType.addTask, payload: task, index: index});
    }

    const reorder = (list: Task[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const moveBetweenRows = (
        originArr: Task[],
        destination: Task[],
        droppableSource: DraggableLocation,
        droppableDestination: DraggableLocation
    ) => {
        const originClone = Array.from(originArr);
        const destClone = Array.from(destination);
        const [removed] = originClone.splice(droppableSource.index, 1);
        removed.tagGroup = tagGroups[droppableDestination.index];
        console.log(removed.tagGroup)
        destClone.splice(droppableDestination.index, 0, removed);
        return {origin: originClone, goal: destClone};
    };

    const onClickRemove = (taskId: string, rowNum: number) => {
        setRows({type: TaskActionType.remove, payload: taskId, index: rowNum})
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;

        const from = +source.droppableId;
        const to = +destination.droppableId;
        // const { row, rowIndex } = findRowByTagGroupId(rows, from || to);
        // console.log(row);
        // if (!row) return;
        if (from === to) {
            const newRowOrder = reorder(rows[from], source.index, destination.index);
            const newRows = [...rows];
            newRows[from] = newRowOrder;
            setRows({payload: newRows, type: TaskActionType.replace});
        } else {
            const result = moveBetweenRows(rows[from], rows[to], source, destination);
            const newRows = [...rows];
            newRows[from] = result.origin;
            newRows[to] = result.goal;
            setRows({type: TaskActionType.replace, payload: newRows});
        }
    }

    return (
        <div>
            <Grid container direction={'row'}>
                <DragDropContext onDragEnd={onDragEnd}>
            {rows.length ? (rows.map((row, index) => {
                //const tagGroup = row[0].tagGroup;
                return (
                    <Droppable droppableId={`${index}`} key={index}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{marginRight: "auto"}}
                            >
                                <Grid
                                    item
                                    xs={'auto'}
                                    //key={tagGroup?.groupId || 'no tag'}
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
                                        onClickRemove={onClickRemove}
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
