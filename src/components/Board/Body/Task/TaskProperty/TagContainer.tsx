import {Chip} from "@mui/material";
import {FormEvent, useCallback, useState} from "react";
import TagGroup from "../entity/TagGroup";

type Props = {
    tagGroups: TagGroup[];
}
const TagContainer = (props: Props) => {

    const { tagGroups } = props;
    const [tagNames, setTagNames] = useState<string[]>([]);
    const [editable, setEditable] = useState(false);

    const onChange = (event: FormEvent<HTMLDivElement>) => {
        const value = event.currentTarget.title;
        setTagNames(value);
    }

    const onClickTag = useCallback(() => {
        setEditable(editable => !editable);
    }, []);

    return (

        <Chip
            label={tagNames}
            onClick={onClickTag}
            contentEditable={editable}
            onChange={(event) => onChange(event)}
        />

    );
}

export default TagContainer;
