import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { loginStyles } from '../theme/loginTheme'
import { WhiteLogo } from '../components/WhiteLogo'
import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack'
import { AuthContext } from '../context/AuthContext'


interface Props extends StackScreenProps<any, any>{}

export const RegisterScreen = ({navigation}: Props) => {


  const { singUp, errorMessage, removeError } = useContext(AuthContext)



  const { email, password, name, onChange} = useForm({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    if(errorMessage.length === 0){
      return
    }else{
      Alert.alert(
        'Login incorrecto',
         errorMessage,
         [
          {
            text: 'Ok',
            onPress: removeError
          }
         ]
         )
    }
  }, [errorMessage])

  const onRegister = ()=>{
    console.log({email, password})
    Keyboard.dismiss()
    singUp({
      nombre: name,
      correo: email,
      password
    })
  }




  return (
    <>
    

        <KeyboardAvoidingView
          style={{flex:1, backgroundColor: '#5856D6'}}
          behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
        >
          <View style={loginStyles.formContainer}>


            {/* keyboard avoid view */}
            <WhiteLogo />

            <Text style={loginStyles.title}>Registro</Text>
            <Text style={loginStyles.label}>Nombre:</Text>
            <TextInput 
              placeholder='Ingrese su Nombre'
              placeholderTextColor='rgba(255,255,255,0.4)'
              underlineColorAndroid='white'
              style={[
                loginStyles.inputField,
                (Platform.OS === 'ios') && loginStyles.inputFieldIOS
              ]}
              selectionColor='white'
              
              onChangeText={(value)=>onChange(value, 'name')}
              value={name}
              onSubmitEditing={onRegister}
              
              autoCapitalize='words'
              autoCorrect={false}
              />
            <Text style={loginStyles.label}>Email:</Text>
            <TextInput 
              placeholder='Ingrese su email'
              placeholderTextColor='rgba(255,255,255,0.4)'
              keyboardType='email-address'
              underlineColorAndroid='white'
              style={[
                loginStyles.inputField,
                (Platform.OS === 'ios') && loginStyles.inputFieldIOS
              ]}
              selectionColor='white'
              
              onChangeText={(value)=>onChange(value, 'email')}
              value={email}
              onSubmitEditing={onRegister}
              
              autoCapitalize='none'
              autoCorrect={false}
              />
            

            <Text style={loginStyles.label}>Contraseña:</Text>
            <TextInput 
              placeholder='*******'
              placeholderTextColor='rgba(255,255,255,0.4)'
              underlineColorAndroid='white'
              secureTextEntry={true}
              style={[
                loginStyles.inputField,
                (Platform.OS === 'ios') && loginStyles.inputFieldIOS
              ]}
              selectionColor='white'
              
              onChangeText={(value)=>onChange(value, 'password')}
              value={password}
              onSubmitEditing={onRegister}
              
              autoCapitalize='none'
              autoCorrect={false}
              />


            {/* Boton Login  */}

            <View style={loginStyles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={loginStyles.button}
                onPress={onRegister}
                >
                <Text style={loginStyles.buttonText}>Crear cuenta</Text>

              </TouchableOpacity>

            </View>

            {/* crear una nueva cuenta */}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=> navigation.replace('LoginScreen')}
                style={loginStyles.buttonReturn}
                >
                <Text style={loginStyles.buttonText}>Login</Text>

              </TouchableOpacity>


          </View>

        </KeyboardAvoidingView>







    </>
  )
}
