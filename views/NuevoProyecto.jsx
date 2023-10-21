import { useState } from "react";
import { Container ,Text, Button, Input, FormControl, Item, useToast, VStack, Link, HStack, Center, Box, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useMutation, gql } from "@apollo/client";

const NUEVO_PROYECTO = gql`
mutation nuevoProyecto($input: ProyectoInput) {
  nuevoProyecto(input: $input) {
    nombre
    id
  }
}
`


const NuevoProyecto = () => {

    const [nombrePro, setNombrePro] = useState("")
    const [mensaje, setMensaje]= useState(null)
    const navigation = useNavigation();
    const toast = useToast();
    const [nuevoProyecto] = useMutation(NUEVO_PROYECTO)

    const mostrarAlerta = (mensaje)=>{
        console.log('se crea una alerta')
  
        toast.show({
            description: mensaje, 
            isClosable: true,
            duration:5000
        })
    }
  
    const handleSubmit = async()=>{
        if(nombrePro ===''){
            setNombrePro("El nombre del proyecto es obligatorio")
            mostrarAlerta("El nombre del proyecto es obligatorio")
            return
        }

        try {
            const { data } = await nuevoProyecto({
                variables:{
                    input:{
                        nombre: nombrePro
                    }
                }
            })

            console.log(data)
            mostrarAlerta("Proyecto creado correctamente")
            navigation.navigate("Proyectos")
        } catch (error) {
            console.log(error)
            mostrarAlerta(error.message.replace('GraphQL error',''))
        }
    }


    return ( 
        <Center w="100%" flex="1" backgroundColor="#e84347">

        <Box  safeArea p="2" py="8" w="90%" maxW="290" bg="#e84347">

            

            {/* TITULO */}
          <Heading marginBottom="5" size="lg" fontWeight="600" color="white" _dark={{
          color: "warmGray.50"
        }}>
            Nuevo Proyecto
          </Heading>

          <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="white" fontWeight="medium" size="xs">
            Sign in to continue!
          </Heading>

          <VStack space={3} mt="5">

          <FormControl>
              <FormControl.Label >Nombre del proyecto</FormControl.Label>
              <Input  bg="white" placeholder="Tienda Virtual" onChangeText={text=>{setNombrePro(text)}} />
            </FormControl>
  
  
            {/* <FormControl>
              <FormControl.Label  >Email</FormControl.Label>
              <Input  bg="white" placeholder="juan@gmail.com"  onChangeText={text=>setEmail(text)}/>
            </FormControl> */}
  
  
  
  
            <Button mt="2" colorScheme="indigo" onPress={()=>handleSubmit()}>
              Crear Proyecto
            </Button>

           
               
  
          
  
  
          </VStack>




        </Box>

        </Center>
     );
}
 
export default NuevoProyecto;