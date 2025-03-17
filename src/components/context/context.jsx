'use client'
import axios from "axios"
import { useEffect, useState, createContext, useContext } from "react"

const store = createContext(null)

export function usePageContext() {
    return useContext(store)
}

export default function PageContext({ children }) {
    const [clientes, setClientes] = useState(null)
    const [cliente, setCliente] = useState(null)
    const [lotes, setLotes] = useState(null)
    const [lote, setLote] = useState(null)

    useEffect(() => {
        const consultarTodo = async () => {
            try {
                const clientesEnd = await axios.get("http://127.0.0.1:8000/consultar_usuarios")
                setClientes(clientesEnd.data)
                // const lotesEnd = await axios.get('http://127.0.0.1:8000/consultar_lotes')
                // setLotes(lotesEnd.data)
            } catch (error) {
                console.error("Error al realizar la consulta", error)
            }
        }
        consultarTodo()
    }, [])


    const handleConsultarTodo = async () => {
        try {
            const clientesEnd = await axios.get("http://127.0.0.1:8000/consultar_usuarios")
            setClientes(clientesEnd.data)
            // const lotesEnd = await axios.get('http://127.0.0.1:8000/consultar_lotes')
            // setLotes(lotesEnd.data)
        } catch (error) {
            console.error("Error al realizar la consulta", error)
        }
    }


    const contexValue = {
        handleConsultarTodo,
        clientes,
        setClientes,
        lotes,
        setLotes,
        cliente,
        setCliente,
        lote, 
        setLote,
        
        
    }
    console.log(clientes, 'context')
    return(
        <store.Provider value={contexValue}>
            {children}
        </store.Provider>
    )

}

