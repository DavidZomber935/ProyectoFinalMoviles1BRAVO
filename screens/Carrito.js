import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";

const Carrito = ({ route, navigation }) => {
    const [productosEnCarrito, setProductosEnCarrito] = useState([]);
    const { carrito } = route.params || { carrito: [] };
  
    useEffect(() => {
      if (carrito.length > 0) {
        setProductosEnCarrito(carrito);
      }
    }, [carrito]);
  
    const handleModificarCantidad = (productoId, cantidad) => {
      const carritoActualizado = productosEnCarrito.map((p) =>
        p.Id === productoId ? { ...p, cantidad } : p
      );
      setProductosEnCarrito(carritoActualizado);
    };
  
    const handleFinalizarCompra = () => {
      // Mostrar un mensaje de agradecimiento
      Alert.alert("¡Gracias por su compra!", "Su pedido ha sido procesado con éxito.");
  
      // Eliminar los productos del carrito
      setProductosEnCarrito([]);
    };
  
    // Lógica para calcular precios
    const calcularPrecioBruto = () => {
      return productosEnCarrito.reduce((total, producto) => total + producto.Precio * producto.cantidad, 0);
    };
  
    const calcularIVA = () => {
      const precioBruto = calcularPrecioBruto();
      return precioBruto * 0.12;
    };
  
    const calcularPrecioFinal = () => {
      const precioBruto = calcularPrecioBruto();
      const iva = calcularIVA();
      return precioBruto + iva;
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Carrito de Compras</Text>
        {productosEnCarrito.length === 0 ? (
          <Text>No hay productos en el carrito</Text>
        ) : (
          <>
            <FlatList
              data={productosEnCarrito}
              keyExtractor={(item) => item.Id.toString()}
              renderItem={({ item }) => (
                <View style={styles.productoEnCarrito}>
                  <Image style={styles.imagenProducto} source={{ uri: item.Imagen }} />
                  <Text style={styles.nombreProducto}>{item.Nombre}</Text>
                  <Text style={styles.precioProducto}>${item.Precio.toFixed(2)}</Text>
                  <View style={styles.cantidadContainer}>
                    <TouchableOpacity onPress={() => handleModificarCantidad(item.Id, item.cantidad - 1)}>
                      <Text style={styles.textoBotonCantidad}>-</Text>
                    </TouchableOpacity>
                    <Text>Cantidad: {item.cantidad}</Text>
                    <TouchableOpacity onPress={() => handleModificarCantidad(item.Id, item.cantidad + 1)}>
                      <Text style={styles.textoBotonCantidad}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            {/* Mostrar los precios calculados */}
            <View style={styles.preciosContainer}>
              <Text>Precio Bruto: ${calcularPrecioBruto().toFixed(2)}</Text>
              <Text>IVA (12%): ${calcularIVA().toFixed(2)}</Text>
              <Text>Precio Final: ${calcularPrecioFinal().toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.botonFinalizarCompra} onPress={handleFinalizarCompra}>
              <Text style={styles.textoBoton}>Finalizar Compra</Text>
            </TouchableOpacity>
  
            {/* Botón para volver a la pantalla de Productos */}
            <TouchableOpacity style={styles.botonVolverProductos} onPress={() => navigation.navigate('Productos')}>
              <Text style={styles.textoBoton}>Volver a Productos</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexGrow: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productoEnCarrito: {
    marginBottom: 20,
  },
  imagenProducto: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 8,
  },
  nombreProducto: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  precioProducto: {
    fontSize: 16,
    color: "green",
  },
  cantidadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  botonFinalizarCompra: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  botonVolverProductos: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  preciosContainer: {
    marginTop: 10,
  },
  textoBoton: {
    color: "white",
    textAlign: "center",
  },
  textoBotonCantidad: {
    fontSize: 20,
    color: "blue",
  },
});

export default Carrito;