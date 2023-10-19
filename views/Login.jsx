import { View } from "react-native";
import { Container ,Text, Button, Input, FormControl, Item, Toast, VStack, Link, HStack, Center, Box, Heading } from "native-base";

const Login = () => {

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
            <Input  bg="white" placeholder="juan@gmail.com"  />
          </FormControl>


          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />

            {/* <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link> */}

          </FormControl>





          <Button mt="2" colorScheme="indigo">
            Iniciar Sesión
          </Button>




          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              Soy nuevo.{" "}
            </Text>
            <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} href="#">
              Crear cuenta
            </Link>
          </HStack>




        </VStack>





      </Box>
    </Center>
     );
}
 
export default Login;