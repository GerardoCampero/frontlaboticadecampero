'use client'
import axios from "axios"
import { useEffect, useState, createContext, useContext } from "react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const store = createContext(null)

export function usePageContext() {
    return useContext(store)
}

export default function PageContext({ children }) {
    const [clientes, setClientes] = useState(null)
    const [clienteID, setClienteID] = useState(() => {
        // Leer el clienteID desde sessionStorage si está disponible
        if (typeof window !== "undefined") {
            return sessionStorage.getItem("clienteID") || undefined
        }
        return undefined
    })
    const [fechaLote, setFechaLote] = useState(null)
    const [lotes, setLotes] = useState(null)
    const [lote, setLote] = useState(null)
    const [URL, setURL] = useState(null)
    console.log(fechaLote,'context')

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
        if (URL) {
            const consultarTodo = async () => {
                try {
                    const clientesEnd = await axios.get(`${URL}/consultar_usuarios`)
                    const clientesOrdenados = clientesEnd.data.sort((a, b) => a.id - b.id)
                    setClientes(clientesOrdenados)
                } catch (error) {
                    console.error("Error al realizar la consulta", error)
                }
            }
            consultarTodo()
        }
    }, [URL]) // Solo ejecuta esta parte cuando URL cambie

    // Persistir clienteID en sessionStorage cuando se actualice
    useEffect(() => {
        if (clienteID !== undefined) {
            sessionStorage.setItem("clienteID", clienteID)
        } else {
            sessionStorage.removeItem("clienteID")
        }
    }, [clienteID])


    useEffect(() => {
        // Solo ejecutar la consulta si fechaLote tiene un valor
        if (fechaLote) {
            const consultarFechaLote = async () => {
                console.log(fechaLote, 'context2');
                console.log(clienteID, 'context2');
                try {
                    const params = { fecha: fechaLote };
    
                    // Si clienteID tiene valor, agregarlo a los parámetros
                    if (clienteID !== undefined) {
                        params.usuario_id = clienteID;
                    }
    
                    const response = await axios.get(`${URL}/buscar_lotes`, { params });
                    setLotes(response.data);
                } catch (error) {
                    toast.error(error.response?.data?.detail, {
                        position: "bottom-center",
                      })
                    setLotes(null);
                    // console.error(error.response?.data?.detail || "Error al obtener los lotes");
                }
            };
            consultarFechaLote();
        }
    }, [fechaLote, clienteID, URL]);

    

    const handleConsultarTodo = async () => {
        try {
            const clientesEnd = await axios.get(`${URL}/consultar_usuarios`)
            const clientesOrdenados = clientesEnd.data.sort((a, b) => a.id - b.id)
            setClientes(clientesOrdenados)
        } catch (error) {
            console.error("Error al realizar la consulta", error)
        }
    }
    
    const handleConsultarFechaLote = async () => {

        if(fechaLote) {
            console.log(fechaLote, 'fechaLote')
            try {
                const params = { fecha: fechaLote };
            
                // Si clienteID tiene valor, agregarlo a los parámetros
                if (clienteID !== undefined) {
                    params.usuario_id = clienteID;
                }
                console.log(params, 'params')
                const response = await axios.get(`${URL}/buscar_lotes`, { params });
                setLotes(response.data);
            } catch (error) {
                // toast.error(error.response?.data?.detail, {
                //     position: "bottom-center",
                //   })
                setLotes(null);
                console.log(error.response?.data?.detail || "Error al obtener los lotes");
            }
        }
    };

    const contexValue = {
        handleConsultarTodo,
        handleConsultarFechaLote,
        clientes,
        setClientes,
        lotes,
        setLotes,
        lote,
        setLote,
        URL,
        clienteID,
        setClienteID,
        fechaLote,
        setFechaLote,
        
    }

    return (
        <store.Provider value={contexValue}>
            {children}
        </store.Provider>
    )
}
