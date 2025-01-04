import React from 'react'
import {useGetAllTablesQuery} from '../store/myGridApi'
import MyTableList from '../components/MyTableList/MyTableList'

const TableListPage = () => {
    const {data, isSuccess} = useGetAllTablesQuery()
    return (
        <div>
            {isSuccess && <MyTableList tables={data}/>}
        </div>
    )
}

export default TableListPage