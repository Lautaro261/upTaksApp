import { useState } from "react";
import { View } from "react-native";
import { Container ,Text, Button, Input, FormControl, Item, useToast, VStack, Link, HStack, Center, Box, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTENTICAR_USUARIO = gql`
mutation autenticarUsuario($input: AutenticarInput) {
  autenticarUsuario(input: $input) {
    token
  }
}
`

const Login = () => {

  const [email, setEmail]= useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const toast = useToast();
  const navigation = useNavigation()
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO)

    const mostrarAlerta = (mensaje)=>{
      console.log('se crea una alerta')

      toast.show({
          description: mensaje, 
          isClosable: true,
          duration:5000
      })
  }

    const handlerSubmit= async()=>{

      if(email === "" || password ===""){
        console.log('estoy vacio', email, password)
        setMensaje("Todos los campos son obligatorios");
        mostrarAlerta(mensaje);
        return 
    } 

    if(password.length<6){
        setMensaje("El password debe tener al menos 6 caracteres");
        mostrarAlerta(mensaje);
        return
    }

    console.log(email, password)


    try {
        const { data } = await autenticarUsuario({
            variables:{
                input: {
                  email,
                  password
                }
            }
        })

        console.log(data)
        const { token } = data.autenticarUsuario
        console.log(token)
        await AsyncStorage.setItem('token', token)
        navigation.navigate('Proyectos')

        /* setMensaje(data) */
        /* mostrarAlerta(data); */ /* en lugar de mensaje */
    } catch (error) {

        console.log(error.message.replace('GraphQL error',''))
        setMensaje(error.message.replace('GraphQL error',''))
        mostrarAlerta(error.message.replace('GraphQL error','')) /* en lugar de mensaje */
    }
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
            <FormControl.Label  >Email</FormControl.Label>
            <Input  bg="white" placeholder="juan@gmail.com"  onChangeText={text => setEmail(text)}/>
          </FormControl>


          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={text => setPassword(text)}/>

            {/* <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link> */}

          </FormControl>





          <Button mt="2" colorScheme="indigo" 
          onPress={()=>handlerSubmit()}
          >
            Iniciar Sesión
          </Button>

          <Button mt="2" colorScheme="indigo"
          onPress={()=>navigation.navigate("Register")} 
          >
            Crear Cuenta
          </Button>



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
    </Center>
     );
}
 
export default Login;