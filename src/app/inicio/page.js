'use client'
import { Button, HStack, Box } from "@chakra-ui/react";
import { useColorModeValue, useColorMode } from "@/components/ui/color-mode";


export default function Inicio() {

  const { toggleColorMode } = useColorMode()
  const bg = useColorModeValue('white', "black")
  
  
    
  return (
      <Box > 
        <HStack>
          <Button onClick={toggleColorMode} >Casdr</Button>
          <Button>Click Me!</Button>
        </HStack>
      </Box>

  );
}