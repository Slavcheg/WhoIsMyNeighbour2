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
  const [showError, setError] = useState(false)
  
  const rootStore = useStores()
  
  const navigation = useNavigation()

  const findCountries = () => {
    try{
    setCountries(rootStore.findCountriesBetweenTimezones(startTimeZone, endTimeZone))
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
        text="Find Countries Within Timezones"
      />

      <Text
        style={screenStyles.heading} 
        text={'Please use timezones in format eg. UTC+01:00, UTC-01:00 '}
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
        showError ?
            <Text
              style={screenStyles.heading} 
              text={'Wrongfull entries'}
            />
        : null
      } 

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
