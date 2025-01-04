import React from 'react'
import TableCreation from "./TableCreation/TableCreation"
import TableGenerationFromExcel from "./TableGenerationFromExcel/TableGenerationFromExcel"
import TableListDisplayArea from "./TableListDisplayArea/TableListDisplayArea"
import classes from "./MyTableList.module.css"

const MyTableList = ({tables}) => {

    return (
        <div className={classes.TableList}>
            <TableCreation tables={tables}/>
            <TableGenerationFromExcel className={classes.Distance}/>
            <TableListDisplayArea className={classes.Distance} tables={tables}/>
        </div>
    )
}

export default MyTableList