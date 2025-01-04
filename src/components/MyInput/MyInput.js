import React, {useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons"
import classes from "./MyInput.module.css"

const MyInput = ({className, handleCancelRename, handleSubmitRename}) => {
    const [inputValue, setInputValue] = useState("")

    const onSubmitRename = () => {
        setInputValue("")
        handleSubmitRename(inputValue)
    }

    return (
        <div className={`${className} ${classes.InputWrapper}`}>
            <input className={classes.Input} type="text" value={inputValue}
                   onChange={(e) => setInputValue(e.target.value.trim())}/>
            <div className={classes.InputIconWrapper}>
                <span className={classes.InputIconYes} onClick={onSubmitRename}>
                    <FontAwesomeIcon icon={faCircleCheck}/>
                </span>
                <span className={classes.InputIconNo} onClick={handleCancelRename}>
                    <FontAwesomeIcon icon={faCircleXmark}/>
                </span>
            </div>
        </div>
    )
}

export default MyInput