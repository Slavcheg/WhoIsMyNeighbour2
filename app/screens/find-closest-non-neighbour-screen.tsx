import React, { useState, FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { Screen, Text, Button, InputComponent } from "../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import {screenStyles} from './screen-styles'


export const FindClosestNonNeighbourScreen: Component = observer(function FindClosestNonNeighbourScreen() {
  
  const [country, setCountry] = useState('')
  const [closestNonNeighhbour, setClosestNonNeighhbour] = useState<any>({})
  const [showError, setError] = useState(false)

  const rootStore = useStores()
  
  const navigation = useNavigation()

  const findClosestNonNeighbour= () => {
    try{
      setClosestNonNeighhbour(rootStore.findClosestNonNeighbour(country))
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
        text="Find Closest Non-Neighbour"
      />

      <Text
        style={screenStyles.heading} 
        text={'Please use 3 digit codes eg. BGR '}
      />

      <InputComponent 
        placeholder={'Country code'}
        variable={country}
        setVariable={val => setCountry(val)}
      />

      <Button
        style={screenStyles.btnStyle}
        textStyle={screenStyles.btnTextStyle}
        text={'Find closest non-neighbour'}
        onPress={() => findClosestNonNeighbour()}
      ></Button>

      <Text
        style={screenStyles.heading} 
        text={'Closest non-neighbour is: '
          + closestNonNeighhbour.country
          + ' with distance:'
          + closestNonNeighhbour.distanceFromTarget + ' km'}
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
