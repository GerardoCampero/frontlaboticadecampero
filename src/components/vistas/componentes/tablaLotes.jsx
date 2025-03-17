'use client';

import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from "@/components/ui/menu";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePageContext } from '@/components/context/context';


export default function TablaLotes({ lotes }) {
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [paginatedLotes, setPaginatedLotes] = useState([]);
  const pageSize = 10; // Cantidad de elementos por página
  const { URL } = usePageContext()

 

  // Función para formatear números con separador de miles
  const formatNumber = (number) => {
    return new Intl.NumberFormat('es-AR').format(number);
  };

  // Calcular el número total de páginas
  const totalPages = Math.ceil(lotes.length / pageSize);

  // useEffect para actualizar los lotes paginados al cambiar de página
  useEffect(() => {
    const paginated = lotes.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    setPaginatedLotes(paginated);
  }, [currentPage, lotes]);

  // Función para cambiar la página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEliminarLote = async (id) => {
    try {
      await axios.delete(`${URL}/eliminar_lote/${id}`);
      toast.success('Se eliminó el lote seleccionado');
      // Filtrar el lote eliminado de los lotes paginados
      const updatedLotes = paginatedLotes.filter((lote) => lote.id !== id);
      setPaginatedLotes(updatedLotes);
      window.location.reload();
    } catch (error) {
      toast.error('Error al eliminar el lote');
    }
  };

  return (
    <Box h={'100%'} w={'95%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Flex
        m={5}
        mb={0}
        mt={9}
        h={'100%'}
        w={'100%'}
        direction={'row'}
        bgColor={'gray.50'}
        alignContent={'space-between'}
        borderRadius={15}
        boxShadow="0px 10px 15px rgba(0, 0, 0, 0.2), 0px 4px 6px rgba(0, 0, 0, 0.1)"
        transform="translateY(-10px)"
        alignItems="center" // Centra verticalmente
        justifyContent="center" // Centra horizontalmente
      >
        {/* Columna ID */}
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
            <b>ID</b>
          </Text>
          <VStack spacing={0} h={'100%'}>
            {paginatedLotes.map((item, index) => (
              <MenuRoot key={index} positioning={{ placement: "botton-center" }}>
                <MenuTrigger w={'100%'}>
                  <Text key={index} w={'100%'} textAlign={'center'} borderBottom={'solid'} borderColor={'gray.100'}>
                    {item.id}
                  </Text>
                </MenuTrigger>
                <MenuContent>
                  <VStack>
                    <EditarLote id={item.id}/>
                    <Button variant={'ghost'} size={'xs'} onClick={() => handleEliminarLote(item.id)}>Eliminar</Button>
                  </VStack>
                </MenuContent>
              </MenuRoot>
            ))}
          </VStack>
        </Box>

        {/* Columna Lote */}
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
            <b>Lote</b>
          </Text>
          <VStack spacing={0} h={'100%'}>
            {paginatedLotes.map((item, index) => (
              <Text key={index} w={'100%'} textAlign={'center'} borderBottom={'solid'} borderColor={'gray.100'}>
                {item.lote}
              </Text>
            ))}
          </VStack>
        </Box>

        {/* Columna Descripción */}
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
            <b>Descripción</b>
          </Text>
          <VStack spacing={0} h={'100%'}>
            {paginatedLotes.map((item, index) => (
              <Text key={index} w={'100%'} textAlign={'center'} borderBottom={'solid'} borderColor={'gray.100'}>
                {item.descripcion}
              </Text>
            ))}
          </VStack>
        </Box>


        {/* Columna Cantidad */}
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
            <b>Cantidad</b>
          </Text>
          <VStack spacing={0} h={'100%'}>
            {paginatedLotes.map((item, index) => (
              <Text key={index} w={'100%'} textAlign={'center'} borderBottom={'solid'} borderColor={'gray.100'}>
                {item.cantidad}
              </Text>
            ))}
          </VStack>
        </Box>

        {/* Columna Precio */}
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
            <b>Precio</b>
          </Text>
          <VStack spacing={0} h={'100%'}>
            {paginatedLotes.map((item, index) => (
              <Text key={index} w={'100%'} textAlign={'center'} borderBottom={'solid'} borderColor={'gray.100'}>
                ${formatNumber(item.precio)}
              </Text>
            ))}
          </VStack>
        </Box>

        {/* Columna Total */}
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
            <b>Total</b>
          </Text>
          <VStack spacing={0} h={'100%'}>
            {paginatedLotes.map((item, index) => (
              <Text key={index} w={'100%'} textAlign={'center'} borderBottom={'solid'} borderColor={'gray.100'}>
                ${formatNumber(item.total)}
              </Text>
            ))}
          </VStack>
        </Box>
      </Flex>

      {/* Paginación */}
      <Box mt={4} display="flex" justifyContent="center" >
      <ButtonGroup gap="4" size="sm" variant="solid">
        <IconButton
           onClick={() => handlePageChange(currentPage - 1)}
           aria-label="Página anterior"
           isDisabled={currentPage === 1}
           bg="white"
           _hover={{ bg: "gray.300" }}
           
    
        ><HiChevronLeft color='black' /></ IconButton>
        
        <Text>{currentPage} de {totalPages}</Text>

        <IconButton
           onClick={() => handlePageChange(currentPage + 1)}
           aria-label="Página siguiente"
           isDisabled={currentPage === totalPages}
           bg="white"
           _hover={{ bg: "gray.300" }}
        ><HiChevronRight color='black'/> </ IconButton>
      </ButtonGroup>
    </Box>

      <ToastContainer />
    </Box>
  );
}


import { Dialog, Portal, Stack, Input} from "@chakra-ui/react"
import { Field } from "@/components/ui/field";
import { usePageContext } from '@/components/context/context';



const EditarLote = ({ id }) => {
    const { handleConsultarTodo, URL } = usePageContext()

   

 
    const [lote, setLote] = useState({
      lote: '',
      descripcion: '',
      cantidad: '',
      precio:'',
    });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLote((prevstate) => ({
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

        const loteEditado = generarObjetoConValores(lote)
   
        try {
          const response = await axios.put(
            `${URL}/editar_lote/${id}`, loteEditado,
            {
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              }
            }
          );
    
          // Mostrar un toast de éxito solo después de que la solicitud haya terminado
          toast.success('Lote Editado');
          handleConsultarTodo()
          window.location.reload();
        } catch (error) {
          // Mostrar un toast de error si algo falla
          toast.error(`Error al editar el Lote: ${error.message}`);
        }
      };


  return (
    <Dialog.Root >
      <Dialog.Trigger asChild>
              <Button variant={'ghost'} size={'xs'}  >Editar Lote</Button>

      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Editar Lote</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb={4}>
                <Stack gap="4">
                  <Field label="Lote:">
                    <Input
                      name="lote"
                      value={lote.lote}
                      onChange={handleInputChange}
                      placeholder="Lote"
                    />
                  </Field>
                  <Field label="Descripción:">
                    <Input
                      name="descripcion"
                      value={lote.descripcion}
                      onChange={handleInputChange}
                      placeholder="Descripción del lote"
                    />
                  </Field>
                  <Field label="Cantidad:">
                    <Input
                      type="number"
                      name="cantidad"
                      value={lote.cantidad}
                      onChange={handleInputChange}
                      placeholder="Cantidad"
                    />
                  </Field>
                  <Field label="Precio:">
                    <Input
                      type="number"
                      name="precio"
                      value={lote.precio}
                      onChange={handleInputChange}
                      placeholder="Precio"
                    />
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