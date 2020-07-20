import React, { useState, FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { Screen, Text, Button, InputComponent } from "../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import {screenStyles} from './screen-styles'
import { color } from "../theme"

export const FindCountriesWithinTimezonesScreen: Component = observer(function FindCountriesWithinTimezonesScreen() {
  const [startTimeZone, setStartTimeZone] = useState('')
  const [endTimeZone, setEndTimeZone] = useState('')
  const [countries, setCountries] = useState<string[]>([])
  
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const rootStore = useStores()
  
  // Pull in navigation via hook
  const navigation = useNavigation()

  const findCountries = () => {
    setCountries(rootStore.findCountriesBetweenTimezones(startTimeZone, endTimeZone))
  }

  return (
    <Screen style={screenStyles.screen} preset="scroll">
      <Text
        style={screenStyles.heading} 
        preset="header"
        text="Find Countries Within Timezones"
      />
      <InputComponent 
        placeholder={'Start Timezone'}
        variable={startTimeZone}
        setVariable={val => setStartTimeZone(val)}
      />

      <InputComponent 
        placeholder={'End Timezone'}
        variable={endTimeZone}
        setVariable={val => setEndTimeZone(val)}
      />

      <Button
        style={screenStyles.btnStyle}
        textStyle={screenStyles.btnTextStyle}
        text={'Find countries'}
        onPress={() => findCountries()}
      ></Button>

      {
        countries.map(country => {
          return (
            <View
              key={country}
              style={[{
                width: '20%'
              }]}
            >
              <Text
                style={{color: 'black'}}
              >{country}</Text>
            </View>
          )
        })
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
