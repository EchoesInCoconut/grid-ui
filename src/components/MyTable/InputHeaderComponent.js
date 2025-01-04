import React from 'react'
import {useUpdateColumnMutation} from '../../store/myGridApi'
import EditableHeaderComponent from './EditableHeaderComponent'
import MyInput from "../MyInput/MyInput"

const InputHeaderComponent = (params) => {
    const [updateColumn] = useUpdateColumnMutation()

    const handleSubmitRename = (value) => {
        updateColumn({
            id: +params.column.colId,
            header: value,
        })
    }

    const handleCancelRename = () => {
        const newDefs = params.api.getColumnDefs().map(def => ({...def, headerComponent: EditableHeaderComponent}))
        params.api.setGridOption("columnDefs", newDefs)
    }

    return (
        <MyInput
            handleSubmitRename={handleSubmitRename}
            handleCancelRename={handleCancelRename}
        />
    )
}

export default InputHeaderComponent