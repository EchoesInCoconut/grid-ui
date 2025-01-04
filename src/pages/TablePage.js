import React from 'react'
import {useParams} from 'react-router-dom'
import {useGetByTableIdQuery, useGetTableNameQuery} from '../store/myGridApi'
import MyTable from '../components/MyTable/MyTable'
import '../styles.css'
import TableNotExistPage from "./TableNotExistPage"

const TablePage = () => {
    const {tableId} = useParams()
    const {data, isSuccess, isError, error} = useGetByTableIdQuery(tableId)
    const {
        data: table, isSuccess: isGetTableNameSuccess,
        isError: isTableNameError, error: tableNameError
    } = useGetTableNameQuery(tableId)

    return (
        <div>
            {
                isSuccess &&
                isGetTableNameSuccess &&
                <MyTable key={tableId} tableId={tableId} tableName={table.name} data={data}/>
            }
            {(isError || isTableNameError) && (error.data.value === 0 || tableNameError.data.value === 0) &&
                <TableNotExistPage/>}
        </div>
    )
}

export default TablePage