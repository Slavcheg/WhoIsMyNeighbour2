import React, { useState, FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { Screen, Text, Button, InputComponent } from "../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import {screenStyles} from './screen-styles'

export const FindDistanceScreen: Component = observer(function FindDistanceScreen() {
  const [country1, setCountry1] = useState('')
  const [country2, setCountry2] = useState('')
  const [distance, setDistance] = useState(0)
  const [showError, setError] = useState(false)

  const rootStore = useStores()
  
  const navigation = useNavigation()

  const findDistance = () => {
    try{
      setDistance(rootStore.getDistanceByAlpha3Code(country1, country2))
      setError(false)
    } catch {
      setError(true)
    }
    
  }

  return (
    <Screen style={screenStyles.screen} preset="scroll">
      <Text
        style={screenStyles.heading} 
        preset="header"
        text="Find distance"
      />

      <Text
        style={screenStyles.heading} 
        text={'Please use 3 digit codes eg. BGR '}
      />

      <InputComponent 
        placeholder={'Country one'}
        variable={country1}
        setVariable={val => setCountry1(val)}
      />

      <InputComponent 
        placeholder={'Country two'}
        variable={country2}
        setVariable={val => setCountry2(val)}
      />

      <Button
        style={screenStyles.btnStyle}
        textStyle={screenStyles.btnTextStyle}
        text={'Find distance'}
        onPress={() => findDistance()}
      ></Button>

      <Text
        style={screenStyles.heading} 
        text={'Distance is: ' + distance + ' km'}
      />

      {
        showError ?
            <Text
              style={screenStyles.heading} 
              text={'Wrongfull entries'}
            />
        : null
      } 
      
      <View
        style={[{
          flexGrow: 1
        }]}
      ></View>
      <Button
        style={screenStyles.btnStyle}
        textStyle={screenStyles.btnTextStyle}
        text={'Go back'}
        onPress={() => navigation.goBack()}
      ></Button>
    </Screen>
  )
})
