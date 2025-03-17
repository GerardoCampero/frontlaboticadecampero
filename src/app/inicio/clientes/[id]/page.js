'use client'
import { use } from "react"
import CardCliente from "@/components/vistas/componentes/vistaCliente"

export default function Cliente ({ params }) {
    const promesa =  use(params)
    const paramsID =  promesa.id

    return (
        <CardCliente id={paramsID} />
    )
}