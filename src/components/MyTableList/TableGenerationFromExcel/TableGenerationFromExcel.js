import React, {useRef, useState} from 'react'
import {useImportExcelMutation} from "../../../store/myGridApi"
import {useNavigate} from "react-router-dom"
import classes from "./TableGenerationFromExcel.module.css"

const TableGenerationFromExcel = ({className}) => {
    const navigate = useNavigate()

    const inputFile = useRef(null)
    const handleSelectFile = (e) => {
        e.preventDefault()
        inputFile.current.click()
    }
    const [fileSelected, setFileSelected] = useState(false)
    const [fileName, setFileName] = useState("")
    const [file, setFile] = useState()
    const handleSelectedFile = (e) => {
        setFileSelected(true)
        // check if user clicks open or cancel
        if (e.target.files.length !== 0) {
            setFileName(e.target.files[0].name)
            setFile(e.target.files[0])
        }
    }
    const [importExcel] = useImportExcelMutation()
    // if the first row should be identified as column headers or not
    const [hasColumnHeaders, setHasColumnHeaders] = useState("Yes")
    const handleGenerate = () => {
        importExcel({
            file: file,
            hasColumnHeaders: hasColumnHeaders === "Yes" ? 1 : 0
        }).unwrap().then((fulfilled) => navigate(`/grid/table/${fulfilled}`))
    }

    return (
        <div className={`${className} ${classes.TableCreation}`}>
            <div className={classes.TitleWrapper}>
                <p className={classes.Title}>Generate from Excel</p>
            </div>
            <div className={classes.TableCreationItem}>
                <div className={classes.TableCreationItemName}>Headers</div>
                <select className={classes.TableCreationItemSelect}
                        onChange={(e) => setHasColumnHeaders(e.target.value)}>
                    <option>Yes</option>
                    <option>No</option>
                </select>
            </div>
            <div className={classes.TableCreationItem}>
                <input type="file" id="file" ref={inputFile} accept={".xls,.xlsx"}
                       style={{display: "none"}}
                       onChange={handleSelectedFile}/>
                {fileSelected && <span>{fileName}</span>}
                <button className={classes.Import} onClick={handleSelectFile}>Select a file</button>
            </div>
            <div className={classes.TableCreationItem}>
                <button className={classes.Import}
                        disabled={!fileSelected}
                        onClick={handleGenerate}>Generate
                </button>
            </div>
        </div>
    )
}

export default TableGenerationFromExcel