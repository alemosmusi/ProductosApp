import React, { useEffect } from 'react'
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { ProductsStackParams } from '../navigator/ProductsNavigator'


interface Props extends StackScreenProps<ProductsStackParams,'ProductScreen'>{};

export const ProductScreen = ({navigation, route}:Props) => {



  const { id, name = ''} = route.params


  useEffect(() => {
    
    navigation.setOptions({
      title: (name) ? name : 'Nuevo Producto'
    })

  }, [])
  



  return (
    <View style={styles.container}>

      <ScrollView>
        <Text style={styles.label}>Nombre del producto:</Text>
        <TextInput 
          placeholder='Producto'
          style={styles.textInput}
        />


        <Text style={styles.label}>Categoria:</Text>

        <Button 
            title='Guardar'
            onPress={()=>{}}
            color="#5856D6"
          />

        <View style={{flexDirection: 'row', justifyContent:'center', marginTop:10}}>


          <Button 
            title='Camara'
            onPress={()=>{}}
            color="#5856D6"
          />
          <View style={{width:10}} />
          <Button 
            title='Galeria'
            onPress={()=>{}}
            color="#5856D6"
          />

        </View>


      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop: 10,
    marginHorizontal: 20
  },
  label: {
    fontSize: 18
  },
  textInput:{
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 5,
    marginBottom: 10
  }
})