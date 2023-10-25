import { Container ,Text, Button, ScrollView, Input, FormControl, Item, useToast, VStack, Link, HStack, Center, Box, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useQuery, gql } from "@apollo/client";
import Lista from "./Prueba2";

const GET_PROYECTOS = gql`
query obtenerProyectos {
    obtenerProyectos {
        nombre
        id
        }
    }
`

const Proyectos = () => {

    const navigation = useNavigation();
    const { data, loading, error}= useQuery(GET_PROYECTOS)
    console.log('data: ',data)
    console.log('loading: ',loading)
    console.log('error: ',error)

    return ( 
        <Center w="100%" flex="1" backgroundColor="#e84347">

        <Box  safeArea p="2" py="8" w="90%" maxW="290" bg="#e84347">

            <Button bg="danger.900" onPress={()=>navigation.navigate("NuevoProyecto")}>
                <Text>Nuevo Proyecto</Text>
            </Button>

            <Text>Selecciona un Proyecto</Text>

            <Box  flex="1" safeAreaTop maxW="400px" w="100%">
          <Heading p="4" pb="3" size="lg">
            Inbox
          </Heading>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Lista />
          </ScrollView>
        </Box>



        </Box>

        </Center>
     );
}
 
export default Proyectos;