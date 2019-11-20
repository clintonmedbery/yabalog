import React, {useEffect, useRef} from "react";
import Input from "@material-ui/core/Input";

export const InputField = ({onChange, value, className, styles}) => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    });

    return <Input inputRef={inputRef} onChange={onChange} value={value} className={className} styles={styles}/>;
}