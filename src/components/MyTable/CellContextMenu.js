import React from 'react'
import {
    useDeleteColumnMutation,
    useDeleteRowMutation,
    useInsertColumnMutation,
    useInsertRowMutation
} from '../../store/myGridApi'

const CellContextMenu = ({coordinate, colField, columnIds, rowIndex, rows, tableId, isAnyColumnReordered}) => {
    const [insertColumn] = useInsertColumnMutation()
    const [deleteColumn] = useDeleteColumnMutation()
    const [insertRow] = useInsertRowMutation()
    const [deleteRow] = useDeleteRowMutation()

    const handleInsertColumnToRight = () => {
        console.log("colField", colField)
        console.log("columnIds", columnIds)
        const index = columnIds.indexOf(colField)
        const afterId = index === columnIds.length - 1 ? null : columnIds[index + 1]
        insertColumn({
            prevId: +colField,
            // if afterId is null, +afterId is 0 by default
            afterId: afterId === null ? null : +afterId,
            tableId: tableId
        })
    }

    const handleInsertColumnToLeft = () => {
        console.log("colField", colField)
        console.log("columnIds", columnIds)
        const index = columnIds.indexOf(colField)
        const prevId = index === 0 ? null : columnIds[index - 1]
        insertColumn({
            prevId: prevId === null ? null : +prevId,
            afterId: +colField,
            tableId: tableId
        })
    }

    const handleDeleteColumn = () => {
        console.log("colField", colField)
        deleteColumn({tableId: tableId, id: +colField})
    }

    const handleInsertRowAbove = () => {
        console.log("rowIndex", rowIndex)
        console.log("rows", rows)
        const prevId = rowIndex === 0 ? null : rows[rowIndex - 1].id
        insertRow({
                prevId: prevId === null ? null : +prevId,
                afterId: rows[rowIndex].id,
                tableId: tableId
            }
        )
    }

    const handleInsertRowBelow = () => {
        console.log("rowIndex", rowIndex)
        console.log("rows", rows)
        const afterId = rowIndex === rows.length - 1 ? null : rows[rowIndex + 1].id
        insertRow({
            prevId: rows[rowIndex].id,
            afterId: afterId === null ? null : +afterId,
            tableId: tableId
        })
    }

    const handleDeleteRow = () => {
        console.log("rowIndex", rowIndex)
        console.log("rows", rows)
        deleteRow({
            tableId: tableId,
            id: rows[rowIndex].id
        })
    }

    return (
        <div
            className="context-menu"
            style={{top: `${coordinate.y}px`, left: `${coordinate.x}px`}}
        >
            <ul>
                {!isAnyColumnReordered && <li onClick={handleInsertRowAbove}>Insert a row above</li>}
                {!isAnyColumnReordered && <li onClick={handleInsertRowBelow}>Insert a row below</li>}
                <li onClick={handleInsertColumnToRight}>Insert a column to the right</li>
                <li onClick={handleInsertColumnToLeft}>Insert a column to the left</li>
                {rows.length > 1 && <li onClick={handleDeleteRow}>Delete the row</li>}
                {columnIds.length > 1 && <li onClick={handleDeleteColumn}>Delete the column</li>}
            </ul>
        </div>
    )
}

export default CellContextMenu