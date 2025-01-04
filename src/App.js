import React from 'react'
import {Route, Routes} from 'react-router-dom'
import TablePage from './pages/TablePage'
import TableListPage from './pages/TableListPage'
import TableNotExistPage from "./pages/TableNotExistPage"

const App = () => {
    return (
        <Routes>
            <Route path='/grid/table/:tableId' element={<TablePage/>}></Route>
            <Route path='/grid/table-list' element={<TableListPage/>}></Route>
            <Route path='/grid/table-not-exist' element={<TableNotExistPage/>}></Route>
        </Routes>
    )
}

export default App