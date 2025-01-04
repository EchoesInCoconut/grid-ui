import React from 'react'
import classes from "./TableNotExistPage.module.css"
import {useNavigate} from "react-router-dom"

const TableNotExistPage = () => {
    const navigate = useNavigate()

    return (
        <div className={classes.page}>
            <div className={classes.content}>
                <p className={classes.title}>OOPS!</p>
                <div className={classes.warning}>
                    <div>The table doesn't exist anymore.</div>
                    <div className={classes.distance}>Please click <span className={classes.back}
                                             onClick={() => navigate('/grid/table-list')}>here</span> to return to Table
                    Creation page :)</div>
                </div>
            </div>
        </div>
    )
}

export default TableNotExistPage