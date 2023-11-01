import React from 'react'
import { Image, View } from 'react-native'

export const WhiteLogo = () => {
  return (
    <View style={{
        alignItems: 'center',

    }}>
        <Image 
            source={require('../assets/lobito.png')}
            style={{
                width:110,
                height:100
            }}
        />
        
    </View>
  )
}
