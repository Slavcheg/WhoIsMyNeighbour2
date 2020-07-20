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
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const rootStore = useStores()
  
  // Pull in navigation via hook
  const navigation = useNavigation()

  const findClosestNonNeighbour= () => {
    setClosestNonNeighhbour(rootStore.findClosestNonNeighbour(country))
  }

  return (
    <Screen style={screenStyles.screen} preset="scroll">
      <Text
        style={screenStyles.heading} 
        preset="header"
        text="Find Closest Non-Neighbour"
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
