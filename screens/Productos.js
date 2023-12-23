import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import datosProductos from '../list/Productos.json';
import { useNavigation } from '@react-navigation/native';

const Productos = () => {
  const navigation = useNavigation();
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    setProductos(datosProductos);
  }, []);

  useEffect(() => {
    console.log('Carrito actualizado:', carrito);
    navigation.navigate('Carrito', { carrito });
  }, [carrito, navigation]);

  const handleAgregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((p) => p.Id === producto.Id);

    if (productoExistente) {
      const carritoActualizado = carrito.map((p) =>
        p.Id === producto.Id ? { ...p, cantidad: p.cantidad + 1 } : p
      );
      setCarrito(carritoActualizado);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Listado de Productos</Text>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productoContainer}>
            <Image style={styles.imagenProducto} source={{ uri: item.Imagen }} />
            <Text style={styles.nombreProducto}>{item.Nombre}</Text>
            <Text style={styles.precioProducto}>${item.Precio.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.botonAgregarCarrito}
              onPress={() => handleAgregarAlCarrito(item)}
            >
              <Text style={styles.textoBoton}>Añadir al Carrito</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productoContainer: {
    marginBottom: 20,
  },
  imagenProducto: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  nombreProducto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  precioProducto: {
    fontSize: 16,
    color: 'green',
  },
  botonAgregarCarrito: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textoBoton: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Productos;