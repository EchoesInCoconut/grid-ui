import React from 'react'
import {useReorderCellsInColumnMutation} from "../../store/myGridApi"

const ColumnContextMenu = ({coordinate, columnId, cellSort}) => {
    const [reorderCellsInColumn] = useReorderCellsInColumnMutation()

    return (
        <div className="context-menu" style={{top: `${coordinate.y}px`, left: `${coordinate.x}px`}}>
            <ul>
                {cellSort !== 1 &&
                    <li onClick={() => reorderCellsInColumn({columnId: columnId, cellSort: 1})}>
                        Sort ascending
                    </li>}
                {cellSort !== 2 &&
                    <li onClick={() => reorderCellsInColumn({columnId: columnId, cellSort: 2})}>
                        Sort descending
                    </li>}
                {cellSort !== 0 &&
                    <li onClick={() => reorderCellsInColumn({columnId: columnId, cellSort: 0})}>
                        Clear sort
                    </li>}
            </ul>
        </div>
    )
}

export default ColumnContextMenu