import React from "react";
import { View, Text, Button } from "react-native";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";


const Prueba = () => {
  const GET_HELLO = gql`
    query GetHello {
      saludo
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_HELLO);
  const [loadingButton, setLoadingButton] = useState(false);

  const handleButtonClick = async () => {
    setLoadingButton(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Error al consultar:", error);
    }
    setLoadingButton(false);
  };

  return (
    <View>
      <Text>Hello from Apollo Client!</Text>
      <Text>Hello from Apollo Client!</Text>
      <Text>Hello from Apollo Client!</Text>
      <Button
        title="Hacer consulta"
        onPress={handleButtonClick}
        disabled={loadingButton}
      />

      {loading && <Text>Cargando...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {data && <Text>Respuesta de la consulta: {data.saludo}</Text>}
    </View>
  );
};

export default Prueba;
