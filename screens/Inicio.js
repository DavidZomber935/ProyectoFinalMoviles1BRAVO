import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Inicio = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido a Mi App</Text>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.textoBoton}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate("Registro")}
      >
        <Text style={styles.textoBoton}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  boton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textoBoton: {
    color: "white",
    textAlign: "center",
  },
});

export default Inicio;