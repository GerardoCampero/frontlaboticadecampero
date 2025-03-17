'use client'

import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { Box, Button, HStack,  Link, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import NavBarLotes from "@/components/vistas/componentes/navBarLotes";



export default function LayoutInicio({ children }) {
  const { setColorMode } = useColorMode()
  
  useEffect(() =>{
    setColorMode('white')
  },[setColorMode])
  

  return (
          <Box>
            <Box  height={"10vh"} borderBottom={'solid'} alignContent={'center'}>
              <HStack  justifyContent={'space-around'} >
                <NavBarLotes/>
                <Heading size={'5xl'}>La Botica de Campero</Heading>
                <Button as={Link} href={`/inicio/clientes`} >Clientes</Button>
              </HStack>
              
            </Box>  
            {children}
          </Box>
    );
}