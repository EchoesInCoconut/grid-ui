import React, {useEffect, useState} from 'react'
import InputHeaderComponent from './InputHeaderComponent'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowDown, faArrowUp, faPenToSquare} from "@fortawesome/free-solid-svg-icons"
import classes from "./EditableHeaderComponent.module.css"

const EditableHeaderComponent = (params) => {
    const handleRenameHeader = () => {
        console.log("rename column", params.column.colId)
        const newDefs = params.api.getColumnDefs().map(def => {
            if (def.field === params.column.colId) {
                return ({
                    ...def,
                    headerComponent: InputHeaderComponent
                })
            } else {
                return ({...def})
            }
        })
        params.api.setGridOption("columnDefs", newDefs)
    }

    const [cellSort, setCellSort] = useState()
    useEffect(() => {
        setCellSort(params.dbColumns.find(column => column.id === +params.column.colId).cellSort)
    }, [params.dbColumns])

    return (
        <div className={classes.Header}
             onContextMenu={(e) => params.handleRightClickHeader(e.pageX, e.pageY, params.column.colId)}>
            <div>{params.displayName}</div>
            <div className={classes.HeaderIcons}>
                {cellSort === 1 &&
                    <div className={classes.HeaderArrow}><FontAwesomeIcon icon={faArrowUp}/></div>}
                {cellSort === 2 &&
                    <div className={classes.HeaderArrow}><FontAwesomeIcon icon={faArrowDown}/></div>}
                <div>
                    <FontAwesomeIcon icon={faPenToSquare} onClick={handleRenameHeader}/>
                </div>
            </div>
        </div>
    )
}

export default EditableHeaderComponent