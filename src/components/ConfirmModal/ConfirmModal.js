import React from 'react'
import Backdrop from "../Backdrop/Backdrop"
import classes from "./ConfirmModal.module.css"

const ConfirmModal = (props) => {
    return (
        <Backdrop>
            <div className={classes.Modal}>
                <div className={classes.Q}>{props.confirmText}</div>
                <div className={classes.A}>
                    <button onClick={() => props.onConfirm(true)}>Yes</button>
                    <button onClick={() => props.onConfirm(false)}>No</button>
                </div>
            </div>
        </Backdrop>
    )
}

export default ConfirmModal