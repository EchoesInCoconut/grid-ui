import React, {useEffect, useRef, useState} from 'react'
import {AgGridReact} from 'ag-grid-react'
import '../../styles.css'
import {
    useMoveColumnMutation,
    useMoveRowMutation,
    useUpdateCellMutation,
    useUpdateTableNameMutation
} from '../../store/myGridApi'
import useContextMenu from '../../hooks/useContextMenu'
import CellContextMenu from './CellContextMenu'
import EditableHeaderComponent from './EditableHeaderComponent'
import ColumnContextMenu from "./ColumnContextMenu"
import MyInput from "../MyInput/MyInput"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBackward, faDownload} from "@fortawesome/free-solid-svg-icons"
import {useNavigate} from "react-router-dom"
import classes from "./MyTable.module.css"
import axios from "axios"

const MyTable = (props) => {
    const [moveColumn] = useMoveColumnMutation()
    const [moveRow] = useMoveRowMutation()
    const [updateCell] = useUpdateCellMutation()

    const gridRef = useRef()
    // string
    const [colField, setColField] = useState()
    const [columnIds, setColumnIds] = useState()
    const [clickedColumnId, setClickedColumnId] = useState()
    // number
    const [rowIndex, setRowIndex] = useState()

    const [rowData, setRowData] = useState()
    useEffect(() => {
        setRowData(props.data.cellsByRows)
    }, [props.data])


    // column definitions
    const columnDefs = props.data.columns.map((column, index) => index === 0 ?
        ({
            field: column.id.toString(),
            // if column header is null, it will be field value by default
            headerName: column.header === null ? "" : column.header,
            rowDrag: true
        }) :
        ({
            field: column.id.toString(),
            headerName: column.header === null ? "" : column.header,
        })
    )
    const handleRightClickHeader = (x, y, colId) => {
        setClicked(false)
        setHeaderClicked(true)
        setHeaderCoordinate({x: x, y: y})
        setClickedColumnId(colId)
    }
    const defaultColDef = {
        flex: 1,
        minWidth: 120,
        editable: true,
        valueSetter: (params) => {
            if (params.newValue !== params.oldValue) {
                const newData = {...params.data, [params.colDef.field]: params.newValue}
                params.node.setData(newData)
                return true
            }
            return false
        },
        headerComponent: EditableHeaderComponent,
        headerComponentParams: {handleRightClickHeader, dbColumns: props.data.columns}
    }


    // drag column
    const [movedColumnId, setMovedColumnId] = useState()
    const onColumnMoved = ({column}) => {
        setMovedColumnId(column?.colId)
    }
    const onDragStopped = (params) => {
        const columnIds = params.api.getColumnState().map(col => col.colId)
        if (movedColumnId !== undefined) {
            const index = columnIds.indexOf(movedColumnId)
            moveColumn({
                id: +movedColumnId,
                // get new neighbors of column after dragging
                // if column is moved to first
                prevId: index === 0 ? null : +columnIds[index - 1],
                // if column is moved to last
                afterId: index === columnIds.length - 1 ? null : +columnIds[index + 1]
            })
        }
    }

    // drag row
    const onRowDragEnd = ({node}) => {
        console.log(node)
        console.log(props.data.rows)
        // node.sourceRowIndex is incorrect
        const sourceRowIndex = +node.id
        if (node.rowIndex !== sourceRowIndex) {
            const movedRow = props.data.rows[sourceRowIndex]
            let prevIndex, afterIndex
            // dragging direction is up
            if (sourceRowIndex > node.rowIndex) {
                prevIndex = node.rowIndex - 1
                afterIndex = node.rowIndex
            } else {
                // dragging direction is down
                prevIndex = node.rowIndex
                afterIndex = node.rowIndex + 1
            }
            // if row is dragged to first
            const prevRow = prevIndex < 0 ? null : props.data.rows[prevIndex]
            // if row is dragged to last
            const afterRow = afterIndex > props.data.rows.length - 1 ? null : props.data.rows[afterIndex]
            moveRow({
                id: movedRow.id,
                prevId: prevRow?.id,
                afterId: afterRow?.id,
            })
        }
    }

    // edit cell
    const onCellEditingStopped = (e) => {
        if (e.valueChanged) {
            const row = props.data.rows[e.rowIndex]
            updateCell({
                tableId: props.tableId,
                rowId: row.id,
                columnId: +e.colDef.field,
                value: e.newValue,
            })
        }
    }

    // right click cell
    const {clicked, setClicked, coordinate, setCoordinate} = useContextMenu()
    // right click column header
    const {
        clicked: headerClicked,
        setClicked: setHeaderClicked,
        coordinate: headerCoordinate,
        setCoordinate: setHeaderCoordinate
    } = useContextMenu()

    const [tableNameClicked, setTableNameClicked] = useState(false)
    const [updateTableName] = useUpdateTableNameMutation()
    const handleSubmitRename = (value) => {
        setTableNameClicked(false)
        updateTableName({
            tableId: props.tableId,
            tableName: value
        })
    }

    // export
    const navigate = useNavigate()
    const handleDownload = () => {
        axios.get(`http://localhost:8081/grid/export/excel/${props.tableId}`,
            {responseType: 'blob'}).then(res => {
            const fileName = res.headers['content-disposition'].replace("form-data; name=\"attachment\"; filename=", "").replaceAll("\"", "")
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.download = fileName
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        })
    }

    return (
        <div className={classes.TableWrapper}>
            <div className={classes.TableNameWrapper}>
                <span className={classes.Backward} onClick={() => navigate('/grid/table-list')}>
                    <FontAwesomeIcon icon={faBackward}/>
                </span>
                {tableNameClicked ?
                    <MyInput
                        className={classes.TableNameInput}
                        handleCancelRename={() => setTableNameClicked(false)}
                        handleSubmitRename={handleSubmitRename}
                    /> :
                    <span className={classes.TableName}
                          onClick={() => setTableNameClicked(true)}>{props.tableName}</span>
                }
                <span className={classes.Download} onClick={handleDownload}>
                    <FontAwesomeIcon icon={faDownload}/>
                </span>
            </div>
            <div
                style={{height: "100%", width: "100%"}}
                className="ag-theme-alpine"
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    // rows cannot be dragged if any column is reordered
                    rowDragManaged={!props.data.columns.some(column => column.cellSort !== 0)}
                    suppressDragLeaveHidesColumns={true}
                    onColumnMoved={onColumnMoved}
                    onRowDragEnd={onRowDragEnd}
                    onDragStopped={onDragStopped}
                    onCellEditingStopped={onCellEditingStopped}
                    preventDefaultOnContextMenu={true}
                    onCellContextMenu={(params) => {
                        setHeaderClicked(false)
                        setClicked(true)
                        setCoordinate({x: params.event.pageX, y: params.event.pageY})
                        setColField(params.colDef.field)
                        setColumnIds(params.api.getColumnState().map(col => col.colId))
                        setRowIndex(params.rowIndex)
                    }}
                />
                {clicked &&
                    <CellContextMenu
                        coordinate={coordinate}
                        colField={colField}
                        columnIds={columnIds}
                        rowIndex={rowIndex}
                        rows={props.data.rows}
                        tableId={props.tableId}
                        // row cannot be inserted if any column is reordered
                        isAnyColumnReordered={props.data.columns.some(column => column.cellSort !== 0)}
                    />}
                {headerClicked &&
                    <ColumnContextMenu
                        coordinate={headerCoordinate}
                        columnId={clickedColumnId}
                        cellSort={props.data.columns.find(column => column.id === +clickedColumnId).cellSort}
                    />}
            </div>
        </div>
    )
}

export default MyTable