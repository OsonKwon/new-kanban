import Tag from "../entity/Tag";
import {Chip} from "@mui/material";
import {FormEvent, useCallback, useState} from "react";

type Props = {
    tag: Tag;
}
const TagContainer = (props: Props) => {

    const { tag } = props;
    const [tagName, setTagName] = useState(tag.name);
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
