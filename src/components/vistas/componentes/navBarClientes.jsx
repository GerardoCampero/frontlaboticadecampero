'use client'

import { Button, Box, HStack, Input, Stack, Switch, SwitchRoot, SwitchHiddenInput, SwitchControl, SwitchThumb, SwitchLabel, Dialog, Portal } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { LuSearch } from "react-icons/lu";

import { Field } from "@/components/ui/field";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { usePageContext } from "@/components/context/context";


export default function NavBarClientes() {
  const { setClientes, handleConsultarTodo, URL } = usePageContext()
  const ref = useRef(null);
  const clienteInicial = {
    nombre: '',
    apellido: '',
    facebook: '',
    instagram:'',
    telefono: '',
    admin: false,
  }
  const [cliente, setCliente] = useState(clienteInicial);



  const handleSearch =  async (e) => {
    const valor =  e.target.value
 

    try {
      const busqueda = await axios.get(`${URL}/buscar_usuario?valor=${valor}`)
      setClientes(busqueda.data)
    } catch (error) {
      toast.error(error.response.data.detail, {
        position: "bottom-center",
      });
    }

    

  }


  // const handleSwitchChange = () => {
  //   setCliente({ ...cliente, admin: !cliente.admin });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCliente((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));

  };

  const handleSubmit = async () => {

    try {
      const response = await axios.post(
        `${URL}/crear_usuario`,
        {
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          facebook: cliente.facebook,
          instagram: cliente.instagram,
          telefono: cliente.telefono,
          admin: cliente.admin,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          }
        }
      );

      // Mostrar un toast de éxito solo después de que la solicitud haya terminado
      toast.success('Usuario Creado', {
        position: "bottom-center",
      });
      setCliente(clienteInicial)
      handleConsultarTodo()
    } catch (error) {
      // Mostrar un toast de error si algo falla
      toast.error(`Error al crear el usuario: ${error.message}`, {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
    <Box  w={'90%'} p={3} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
      {/* Asegúrate de que Dialog.Trigger no anide otro botón */}
      <Dialog.Root >
        <Dialog.Trigger asChild>
          {/* Este botón ahora es el único dentro de Dialog.Trigger */}
          <Button>Crear Cliente</Button>
        </Dialog.Trigger>
        <InputGroup startElement={<LuSearch />} >
          <Input defaultValue={""} placeholder="Buscar Cliente..." type="search" onChange={handleSearch} />
        </InputGroup>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
          <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Crear Usuario</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body pb="4">
            <Stack gap="4">
              <Field label="Nombre:">
                <Input name="nombre" value={cliente.nombre} onChange={handleInputChange} placeholder="Nombre" />
              </Field>
              <Field label="Apellido:" >
                <Input name="apellido" value={cliente.apellido} onChange={handleInputChange} placeholder="Apellido" />
              </Field>
              <Field label="Facebook:">
                <Input name="facebook" value={cliente.facebook} onChange={handleInputChange} placeholder="Facebook" />
              </Field>
              <Field label="Instagram:">
                <Input name="instagram" value={cliente.instagram} onChange={handleInputChange} placeholder="Instagram" />
              </Field>
              <Field label="Telefono:">
                <Input name="telefono" value={cliente.telefono} onChange={handleInputChange} placeholder="Instagram" />
              </Field>
              {/* <SwitchRoot checked={cliente.admin} onCheckedChange={handleSwitchChange}>
                <SwitchHiddenInput />
                <SwitchLabel>Admin:</SwitchLabel>
                <SwitchControl>
                  <SwitchThumb />
                </SwitchControl>
              </SwitchRoot> */}
            </Stack>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              {/* Botón para cancelar */}
              <Button variant={"outline"}>Cancelar</Button>
            </Dialog.ActionTrigger>
            <Dialog.ActionTrigger asChild>
              {/* Botón para crear */}
              <Button onClick={handleSubmit}>Crear</Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>
          </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root >

      {/* Input de búsqueda */}
    </Box>
      <ToastContainer />
    </>
  );
}
