import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const myGridApi = createApi({
    reducerPath: 'myGridApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8081/grid/'}),
    tagTypes: ['TableList', 'Table', 'TableName'],
    endpoints(build) {
        return {
            getAllTables: build.query({
                query() {
                    return 'all'
                },
                providesTags: ['TableList']
            }),
            createTable: build.mutation({
                query(createTableVo) {
                    return {
                        url: 'create',
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        body: JSON.stringify(createTableVo)
                    }
                },
                invalidatesTags: ['TableList']
            }),
            deleteTable: build.mutation({
                query(tableId) {
                    return `delete/${tableId}`
                },
                invalidatesTags: ['TableList']
            }),
            getByTableId: build.query({
                query(tableId) {
                    return `get/${tableId}`
                },
                providesTags: ['Table']
            }),
            moveColumn: build.mutation({
                query(moveVo) {
                    return {
                        url: 'move/column',
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        body: JSON.stringify(moveVo)
                    }
                },
                invalidatesTags: ['Table']
            }),
            moveRow: build.mutation({
                query(moveVo) {
                    return {
                        url: 'move/row',
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        body: JSON.stringify(moveVo)
                    }
                },
                invalidatesTags: ['Table']
            }),
            insertColumn: build.mutation({
                query(insertVo) {
                    return {
                        url: 'insert/column',
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        body: JSON.stringify(insertVo)
                    }
                },
                invalidatesTags: ['Table']
            }),
            insertRow: build.mutation({
                query(insertVo) {
                    return {
                        url: 'insert/row',
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        body: JSON.stringify(insertVo)
                    }
                },
                invalidatesTags: ['Table']
            }),
            deleteColumn: build.mutation({
                query(deleteVo) {
                    return {
                        url: 'delete/column',
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        body: JSON.stringify(deleteVo)
                    }
                },
                invalidatesTags: ['Table']
            }),
            deleteRow: build.mutation({
                query(deleteVo) {
                    return {
                        url: 'delete/row',
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        body: JSON.stringify(deleteVo)
                    }
                },
                invalidatesTags: ['Table']
            }),
            updateCell: build.mutation({
                query(cell) {
                    return {
                        url: 'update/cell',
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        body: JSON.stringify(cell)
                    }
                },
                invalidatesTags: ['Table']
            }),
            updateColumn: build.mutation({
                query(column) {
                    return {
                        url: 'update/column',
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        body: JSON.stringify(column)
                    }
                },
                invalidatesTags: ['Table']
            }),
            reorderCellsInColumn: build.mutation({
                query(reorderCellsVo) {
                    return {
                        url: 'reorder/cells-in-column',
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        body: JSON.stringify(reorderCellsVo)
                    }
                },
                invalidatesTags: ['Table']
            }),
            importExcel: build.mutation(({
                query({file, hasColumnHeaders}) {
                    let formData = new FormData
                    formData.append("file", file)
                    formData.append("hasColumnHeaders", hasColumnHeaders)
                    return {
                        url: 'import/excel',
                        method: 'POST',
                        body: formData
                    }
                },
                invalidatesTags: ['TableList']
            })),
            updateTableName: build.mutation({
                query(updateTableNameVo) {
                    return {
                        url: 'update/table-name',
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        body: JSON.stringify(updateTableNameVo)
                    }
                },
                invalidatesTags: ['TableName']
            }),
            getTableName: build.query({
                query(tableId) {
                    return `get/table-name/${tableId}`
                },
                providesTags: ['TableName']
            })
        }
    }
})

export const {
    useGetAllTablesQuery,
    useCreateTableMutation,
    useDeleteTableMutation,
    useGetByTableIdQuery,
    useMoveColumnMutation,
    useMoveRowMutation,
    useInsertColumnMutation,
    useInsertRowMutation,
    useDeleteColumnMutation,
    useDeleteRowMutation,
    useUpdateCellMutation,
    useUpdateColumnMutation,
    useReorderCellsInColumnMutation,
    useImportExcelMutation,
    useUpdateTableNameMutation,
    useGetTableNameQuery
} = myGridApi
export default myGridApi