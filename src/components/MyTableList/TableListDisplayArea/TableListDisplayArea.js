import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import classes from "./TableListDisplayArea.module.css"
import {useDeleteTableMutation} from "../../../store/myGridApi"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircleMinus} from "@fortawesome/free-solid-svg-icons"
import ConfirmModal from "../../ConfirmModal/ConfirmModal";

const TableListDisplayArea = ({className, tables}) => {
    const navigate = useNavigate()
    const [deleteTable] = useDeleteTableMutation()
    const [show, setShow] = useState(false)
    const [tableIdToBeDeleted, setTableIdToBeDeleted] = useState()

    const handleDeleteTable = (isConfirmed) => {
        setShow(false)
        if (isConfirmed) {
            console.log(tableIdToBeDeleted)
            deleteTable(tableIdToBeDeleted).unwrap().then(() => navigate('/grid/table-list'))
        }
    }

    return (
        <div>
            <div className={`${className} ${classes.TableList}`}>
                <div className={classes.TitleWrapper}>
                    <p className={classes.Title}>Tables</p>
                </div>
                <div className={classes.TableListItems}>
                    {tables.map(table =>
                        <div className={classes.TableListItem} key={table.id}>
                        <span className={classes.TableDeleteIcon}
                              onClick={() => {
                                  setShow(true)
                                  setTableIdToBeDeleted(table.id)
                              }}>
                            <FontAwesomeIcon icon={faCircleMinus}/>
                        </span>
                            <span className={classes.TableName}
                                  onClick={() => navigate(`/grid/table/${table.id}`)}>
                            {table.name}
                        </span>
                        </div>
                    )}
                </div>
            </div>
            {show &&
                <ConfirmModal
                    confirmText={"Do you want to delete the file?"}
                    onConfirm={handleDeleteTable}
                />}
        </div>
    )
}

export default TableListDisplayArea