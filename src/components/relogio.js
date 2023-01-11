import { useEffect, useState } from "react"


const Relogio = ({state})=>{

    const [time,settime] = useState("")
    

    setInterval(()=>{
        settime(new Date().toLocaleTimeString())
    },1000)

    // useEffect(()=>{

    //     document.title = state ? 'funcionando' : ''

    //     return () => document.title = ""
    // },[state])

    return(
        <>
            <p>{time}</p>
        </>
    )
}


export default Relogio;