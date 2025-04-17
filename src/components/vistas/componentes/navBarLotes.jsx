'use client'

import { Button, Box, Stack, Input, Dialog, Portal } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { LuSearch } from "react-icons/lu";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { usePageContext } from "@/components/context/context";




export default function NavBarLotes() {
  const ref = useRef(null);
  const { URL, handleConsultarFechaLote, } =  usePageContext()


  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  
  const parts = formatter.formatToParts(new Date());
  const dateObj = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const fechaBuenosAires = `${dateObj.year}-${dateObj.month}-${dateObj.day}`;

  const initialLoteState = {
    usuario_id: null,
    lote: null,
    descripcion: null,
    cantidad: null,
    precio: null,
    fecha: fechaBuenosAires,
    // fecha: new Date().toISOString().split('T')[0], // La fecha se genera automáticamente en formato YYYY-MM-DD
  };
  console.log(initialLoteState,)
  const [lote, setLote] = useState(initialLoteState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLote((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(lote, 'lote')
    try {
      const response = await axios.post(
        `${URL}/crear_lote`,
        lote,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          }
        }
      );

      setLote(initialLoteState)
      handleConsultarFechaLote()
      // Mostrar un toast de éxito solo después de que la solicitud haya terminado
      toast.success('Lote Creado', {
        position: "bottom-center",
      });
    } catch (error) {
      // Mostrar un toast de error si algo falla
      // console.log(error.response.data.detail, 'lotes')
      setLote(initialLoteState)
      toast.error(`Error al crear el lote: ${error.response?.data?.detail}`, {
        position: "bottom-center",
      });
    }
  };

  return (
    <Box>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>Crear Lote</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Crear Lote</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4">
                <Stack gap="4">
                  <Field label="Lote:">
                    <Input
                      name="lote"
                      value={lote?.lote || ''}
                      onChange={handleInputChange}
                      placeholder="Lote"
                    />
                  </Field>
                  <Field label="Usuario:">
                    <Input
                      name="usuario_id"
                      type="number"
                      value={lote?.usuario_id !== null ? lote.usuario_id: ''}
                      onChange={handleInputChange}
                      placeholder="Id del usuario"
                    />
                  </Field>
                  <Field label="Descripción:">
                    <Input
                      name="descripcion"
                      value={lote?.descripcion || ''}
                      onChange={handleInputChange}
                      placeholder="Descripción del lote"
                    />
                  </Field>
                  <Field label="Cantidad:">
                    <Input
                      type="number"
                      name="cantidad"
                      value={lote?.cantidad !== null ? lote.cantidad: ''}
                      onChange={handleInputChange}
                      placeholder="Cantidad"
                    />
                  </Field>
                  <Field label="Precio:">
                    <Input
                      type="number"
                      name="precio"
                      value={lote?.precio !== null ? lote.precio: ''}
                      onChange={handleInputChange}
                      placeholder="Precio"
                    />
                  </Field>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant={"outline"}>Cancelar</Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                  <Button onClick={handleSubmit}>Crear</Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>


      {/* <ToastContainer /> */}
    </Box>
  );
}
