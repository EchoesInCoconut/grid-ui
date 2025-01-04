import {useEffect, useState} from 'react'

const useContextMenu = () => {
    const [clicked, setClicked] = useState(false)
    const [coordinate, setCoordinate] = useState({x: 0, y: 0})
    useEffect(() => {
        const handleClick = () => setClicked(false)
        document.addEventListener("click", handleClick)
        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [])
    return {clicked, setClicked, coordinate, setCoordinate}
}

export default useContextMenu