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
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const rootStore = useStores()
  
  // Pull in navigation via hook
  const navigation = useNavigation()

  const findDistance = () => {
    setDistance(rootStore.getDistanceByAlpha3Code(country1, country2))
  }

  return (
    <Screen style={screenStyles.screen} preset="scroll">
      <Text
        style={screenStyles.heading} 
        preset="header"
        text="Find distance"
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
