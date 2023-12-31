import { useState } from "react";
import { Container ,Text, Button, Input, FormControl, Item, useToast, VStack, Link, HStack, Center, Box, Heading } from "native-base";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";


    const SALUDO_PRUEBA = gql`
    query saludo {
      saludo
      }
    `
    const NUEVA_CUENTA = gql`
    mutation crearUsuario($input: UsuarioInput) {
      crearUsuario(input: $input)
      }
    `



const Register = () => {


    const [nombre, setNombre] = useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState(null);
    const toast = useToast();
    const [crearUsuario]= useMutation(NUEVA_CUENTA);
    const { loading, error, data } = useQuery(SALUDO_PRUEBA);
    const navigation = useNavigation()
    
    

    const handleSubmit = async()=>{
         if(nombre === ""|| email === "" || password ===""){
            console.log('estoy vacio', nombre, email, password)
            setMensaje("Todos los campos son obligatorios");
            mostrarAlerta(mensaje);
            return 
        } 

        if(password.length<6){
            setMensaje("El password debe tener al menos 6 caracteres");
            mostrarAlerta(mensaje);
            return
        }

        console.log(nombre, email, password)


        try {
            const { data } = await crearUsuario({
                variables:{
                    input: {
                      password,
                      nombre,
                      email
                    }
                }
            })

            console.log(data.crearUsuario)
            setMensaje(data.crearUsuario)
            mostrarAlerta(data.crearUsuario); /* en lugar de mensaje */
            navigation.navigate('Login')
        } catch (error) {
            console.log(error.message.replace('GraphQL error',''))
            setMensaje(error.message.replace('GraphQL error',''))
            mostrarAlerta(error.message.replace('GraphQL error','')) /* en lugar de mensaje */
        }

    }

    const mostrarAlerta = (mensaje)=>{
        console.log('se crea una alerta')

        toast.show({
            description: mensaje, 
            isClosable: true,
            duration:5000
        })
    }


    return ( 
        <Center w="100%" flex="1" backgroundColor="#e84347">


        <Box  safeArea p="2" py="8" w="90%" maxW="290" bg="#e84347">
  
        {/* TITULO */}
          <Heading marginBottom="5" size="lg" fontWeight="600" color="white" _dark={{
          color: "warmGray.50"
        }}>
            UpTask
          </Heading>
  
        {/* SUBTITULO */}
  
          <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="white" fontWeight="medium" size="xs">
            Sign in to continue!
          </Heading>
  
          {/* FORMULARIO COMPLETO (INPUT BOTON Y TEXTO LINK)*/}
          <VStack space={3} mt="5">

          <FormControl>
              <FormControl.Label >Nombre</FormControl.Label>
              <Input  bg="white" placeholder="juan" onChangeText={text=>{setNombre(text)}} />
            </FormControl>
  
  
            <FormControl>
              <FormControl.Label  >Email</FormControl.Label>
              <Input  bg="white" placeholder="juan@gmail.com"  onChangeText={text=>setEmail(text)}/>
            </FormControl>
  
  
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input bg="white" type="password" onChangeText={text=>setPassword(text)}/>
  
              {/* <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500"
            }} alignSelf="flex-end" mt="1">
                Forget Password?
              </Link> */}
  
            </FormControl>
  
  
  
  
  
            <Button mt="2" colorScheme="indigo" onPress={()=>handleSubmit()}>
              Crear cuenta
            </Button>

           
               
  
{/*             <Button mt="2" colorScheme="indigo"
            onPress={()=>navigation.navigate("Register")} 
            >
              Crear Cuenta
            </Button> */}
  
  
  
  {/*           <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
                Soy nuevo.{" "}
              </Text>
              <Link onPress={()=>navigation.navigate("Register")} _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm"
            }} href="#">
                Crear cuenta
              </Link>
            </HStack>
   */}
  
  
  
          </VStack>
  
  
  
  
  
        </Box>

        {data && <Text>Respuesta de la consulta: {data.saludo}</Text>}
      </Center>
     );
}
 
export default Register;