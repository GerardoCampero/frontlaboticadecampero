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
    const [URL, setURL] = useState(null) // Inicializa como null, ya que es un valor que se obtiene dinámicamente

    useEffect(() => {
        // Comprobar el entorno y establecer la URL
        if (process.env.NEXT_PUBLIC_ENTORNO === 'PRD') {
            setURL(process.env.NEXT_PUBLIC_URL_PRD)
        } else {
            setURL(process.env.NEXT_PUBLIC_URL_DEV)
        }
    }, []) // Solo se ejecuta una vez al montar el componente

    useEffect(() => {
        // Solo realizar la consulta si la URL está definida
        console.log(URL,'URL')
        if (URL) {
            const consultarTodo = async () => {
                try {
                    const clientesEnd = await axios.get(`${URL}/consultar_usuarios`)
                    setClientes(clientesEnd.data)
                    // const lotesEnd = await axios.get(`${URL}/consultar_lotes`)
                    // setLotes(lotesEnd.data)
                } catch (error) {
                    console.error("Error al realizar la consulta", error)
                }
            }
            consultarTodo()
        }
    }, [URL]) // Solo ejecuta esta parte cuando URL cambie

    const handleConsultarTodo = async () => {
        try {
            const clientesEnd = await axios.get(`${URL}/consultar_usuarios`)
            setClientes(clientesEnd.data)
            // const lotesEnd = await axios.get(`${URL}/consultar_lotes`)
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

    return (
        <store.Provider value={contexValue}>
            {children}
        </store.Provider>
    )
}
