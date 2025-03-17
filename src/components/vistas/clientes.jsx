'use client'
import { Box, Flex, VStack, Text, Input } from "@chakra-ui/react";
import NavBarClientes from "./componentes/navBarClientes";
import { usePageContext } from "../context/context";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
  } from "@/components/ui/menu"
import { Button } from "@chakra-ui/react";
import { useState } from "react";






export default function VistaClientes() {
    const { clientes, handleConsultarTodo } = usePageContext()

    const deleteUsuario = async (id) => {
        
        try{
            await  axios.delete(`http://127.0.0.1:8000/eliminar_usuario/${id}`)
            toast.success('Se eliminó el usuario')
            handleConsultarTodo()


        } catch (error) {
           
            toast.error('Error al eliminar el usuario')
        }

    }




    return(
        <Box  display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <NavBarClientes/>
            <Flex 
              overflow={'auto'} 
              m={5} 
              mb={0} 
              mt={9} 
              width={'90%'} 
              h={'calc(85vh - 80px)'} 
              direction={'row'} 
              bgColor={'gray.50'} 
              alignContent={"space-between"} 
              borderRadius={15} 
              boxShadow="0px 10px 15px rgba(0, 0, 0, 0.2), 0px 4px 6px rgba(0, 0, 0, 0.1)" 
              transform="translateY(-10px)"
              alignItems="stretch" // Asegura que todas las columnas tengan la misma altura
            >
              <Box flex={1} borderRight={'solid'} borderColor={'gray.100'} bgColor={'gray.50'}>
                <Text 
                  bgColor={'gray.50'} 
                  position={'sticky'} 
                  top={0} 
                  zIndex={2} 
                  mb={2} 
                  padding={2.5} 
                  textAlign={'center'} 
                  borderBottom={'solid'} 
                  borderColor={'gray.100'}
                >
                  <b>N° Cliente</b>
                </Text>
                <VStack 
                  spacing={0} 
                  h={'100%'} // Ajusta el tamaño del VStack para que ocupe todo el espacio
                >
                  {clientes && clientes.map((cliente, index) => {
                    return (
                        <MenuRoot key={index} positioning={{ placement: "botton-center" }}>
                            <MenuTrigger  w={'100%'} >
                                
                                <Text key={index}  cursor={'pointer'} w={'100%'} textAlign={'center'} justifyContent={'center'} borderBottom={'solid'} borderColor={'gray.100'}>
                                    {cliente.id}
                                </Text>
                            </MenuTrigger>
                                <MenuContent>
                                    <VStack>
                                        {/* <MenuItem value="new-txt2">Ver usuario</MenuItem> */}
                                        <Button variant={'ghost'} size={'xs'} as={Link} href={`/inicio/clientes/${cliente.id}`}>Ver Cliente</Button>
                                        {/* <MenuItem value="new-txt" > */}
                                        <Demo id={cliente.id}/>
                                        {/* </MenuItem> */}
                                        <Button  variant={'ghost'} size={'xs'} onClick={() =>(deleteUsuario(cliente.id))}>Eliminar Cliente</Button>
                                        
                                        
                                        {/* <MenuItem value="new-txt5" onClick={() =>(deleteUsuario(cliente.id))} >Eliminar usuario</MenuItem> */}
                                    </VStack>
                               </MenuContent>
                        </MenuRoot>
  
                               
               
                    )
                  })}
                </VStack>
              </Box>
                
              <Box flex={1} borderRight={'solid'} borderColor={'gray.100'}>
                <Text 
                  bgColor={'gray.50'} 
                  position={'sticky'} 
                  top={0} 
                  zIndex={2} 
                  mb={2} 
                  padding={2.5} 
                  textAlign={'center'} 
                  borderBottom={'solid'} 
                  borderColor={'gray.100'}
                >
                  <b>Nombre</b>
                </Text>
                <VStack 
                  spacing={0} 
                  h={'100%'} // Ajusta el tamaño del VStack para que ocupe todo el espacio
                >
                  {clientes && clientes.map((cliente, index) => {
                    return (
                      <Text key={index} w={'100%'} textAlign={'center'} borderBottom={'solid'} borderColor={'gray.100'}>
                        {cliente.nombre ? cliente.nombre : 'N/D'} {cliente.apellido}
                      </Text>
                    )
                  })}
                </VStack>
              </Box>
                
              <Box flex={1} borderRight={'solid'} borderColor={'gray.100'}>
                <Text 
                  bgColor={'gray.50'} 
                  position={'sticky'} 
                  top={0} 
                  zIndex={2} 
                  mb={2} 
                  padding={2.5} 
                  textAlign={'center'} 
                  borderBottom={'solid'} 
                  borderColor={'gray.100'}
                >
                  <b>Facebook</b>
                </Text>
                <VStack 
                  spacing={0} 
                  h={'100%'} // Ajusta el tamaño del VStack para que ocupe todo el espacio
                >
                  {clientes && clientes.map((cliente, index) => {
                    return (
                      <Text key={index} w={'100%'} textAlign={'center'} borderBottom={'solid'} borderColor={'gray.100'}>
                        {cliente.facebook ? cliente.facebook : 'N/D'}
                      </Text>
                    )
                  })}
                </VStack>
              </Box>
                
              <Box flex={1}>
                <Text 
                  bgColor={'gray.50'} 
                  position={'sticky'} 
                  top={0} 
                  zIndex={2} 
                  mb={2} 
                  padding={2.5} 
                  textAlign={'center'} 
                  borderBottom={'solid'} 
                  borderColor={'gray.100'}
                >
                  <b>Instagram</b>
                </Text>
                <VStack 
                  spacing={0} 
                  h={'100%'} // Ajusta el tamaño del VStack para que ocupe todo el espacio
                >
                  {clientes && clientes.map((cliente, index) => {
                    return (
                      <Text key={index} w={'100%'} textAlign={'center'} borderBottom={'solid'} borderColor={'gray.100'}>
                        {cliente.instagram ? cliente.instagram : 'N/D'}
                      </Text>
                    )
                  })}
                </VStack>
              </Box>
            </Flex>




            
        </Box>
    )
}


import { Dialog, Portal, Stack} from "@chakra-ui/react"
import { Field } from "@/components/ui/field";
import Link from "next/link";

const Demo = (id) => {
    const { handleConsultarTodo } = usePageContext()

 
    const [cliente, setCliente] = useState({
      nombre: '',
      apellido: '',
      facebook: '',
      instagram:'',
    });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCliente((prevstate) => ({
          ...prevstate,
          [name]: value,
        }));
    
      };


      const handleSubmit = async (id) => {

        const generarObjetoConValores = (obj) => {
            let nuevoObjeto = {};
            for (let key in obj) {
              if (obj[key]) {  // Verificamos si el valor no es vacío o falsy
                nuevoObjeto[key] = obj[key];
              }
            }
            return nuevoObjeto;
          };

        const clienteEditado = generarObjetoConValores(cliente)
   
        try {
          const response = await axios.put(
            `http://127.0.0.1:8000/editar_usuario/${id.id}`, clienteEditado,
            {
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              }
            }
          );
    
          // Mostrar un toast de éxito solo después de que la solicitud haya terminado
          toast.success('Usuario Editado');
          handleConsultarTodo()
        } catch (error) {
          // Mostrar un toast de error si algo falla
          toast.error(`Error al editar el usuario: ${error.message}`);
        }
      };


  return (
    <Dialog.Root >
      <Dialog.Trigger asChild>
              <Button variant={"ghost"} size={'xs'}  >Editar cliente</Button>

      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Editar Cliente</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb={4}>
                <Stack gap="4">
                  <Field label="Nombre:">
                    <Input name="nombre" 
                    value={cliente.nombre} 
                    onChange={handleInputChange} 
                    placeholder="Nombre" />
                  </Field>
                  <Field label="Apellido:" >
                    <Input name="apellido" 
                    value={cliente.apellido} 
                    onChange={handleInputChange} 
                    placeholder="Apellido" />
                  </Field>
                  <Field label="Facebook:">
                    <Input name="facebook" 
                    value={cliente.facebook} 
                    onChange={handleInputChange} 
                    placeholder="Facebook" />
                  </Field>
                  <Field label="Instagram:">
                    <Input name="instagram" 
                    value={cliente.instagram} 
                    onChange={handleInputChange} 
                    placeholder="Instagram" />
                  </Field>
                </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button onClick={() => (handleSubmit(id))}>Editar</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>

  )
}