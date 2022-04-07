import Tag from "../entity/Tag";
import {Chip} from "@mui/material";
import {FormEvent, useCallback, useState} from "react";
import TagGroup from "../entity/TagGroup";

type Props = {
    tagGroup?: TagGroup;
}
const TagContainer = (props: Props) => {

    const { tagGroup } = props;
    const [tagName, setTagName] = useState(tagGroup?.groupName);
    const [editable, setEditable] = useState(false);

    const onChange = (event: FormEvent<HTMLDivElement>) => {
        const value = event.currentTarget.title;
        setTagName(value);
    }

    const onClickTag = useCallback(() => {
        setEditable(editable => !editable);
    }, [editable]);

    return (
        <Chip
            label={tagName}
            onClick={onClickTag}
            contentEditable={editable}
            onChange={(event) => onChange(event)}
        />

    );
}

export default TagContainer;
