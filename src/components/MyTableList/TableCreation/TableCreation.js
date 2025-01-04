import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import {useCreateTableMutation} from "../../../store/myGridApi"
import classes from "./TableCreation.module.css"

const TableCreation = ({tables}) => {

    const navigate = useNavigate()

    const [createTable] = useCreateTableMutation()

    const [name, setName] = useState("")
    const [isNameOk, setIsNameOk] = useState(true)
    const [columnSize, setColumnSize] = useState(1)
    const [rowSize, setRowSize] = useState(1)

    const handleCreateTable = (e) => {
        e.preventDefault()
        const trimmedName = name.trim()
        const tableNames = tables.map(table => table.name)
        // table name cannot be duplicate
        if (trimmedName === "" || tableNames.indexOf(trimmedName) > -1) {
            setIsNameOk(false)
        } else {
            createTable({
                name: trimmedName,
                columnSize: columnSize,
                rowSize: rowSize,
            }).unwrap().then((fulfilled) => navigate(`/grid/table/${fulfilled}`))
        }
    }

    return (
        <div className={classes.TableCreation}>
            <div className={classes.TitleWrapper}>
                <p className={classes.Title}>Create a Table</p>
            </div>
            <div className={classes.TableCreationItem}>
                <div className={classes.TableCreationItemName}>Table name</div>
                <input style={{borderColor: isNameOk ? "black" : "red"}} type="text" value={name}
                       onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className={classes.TableCreationItem}>
                <div className={classes.TableCreationItemName}>Column size</div>
                <input type="number" min={1} value={columnSize}
                       onChange={(e) => setColumnSize(+e.target.value)}/>
            </div>
            <div className={classes.TableCreationItem}>
                <div className={classes.TableCreationItemName}>Row size</div>
                <input type="number" min={1} value={rowSize}
                       onChange={(e) => setRowSize(+e.target.value)}/>
            </div>
            <div className={classes.TableCreationItem}>
                <button className={classes.CreateButton} onClick={handleCreateTable}>Create</button>
            </div>
        </div>
    )
}

export default TableCreation