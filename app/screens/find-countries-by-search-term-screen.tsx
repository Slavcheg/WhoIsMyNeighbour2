import React, { useState, FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { Screen, Text, Button, InputComponent } from "../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import {screenStyles} from './screen-styles'
import { View } from "react-native"

export const FindCountriesBySearchTermScreen: Component = observer(function FindCountriesBySearchTermScreen() {
  const [term, setTerm] = useState('')
  const [result, setResult] = useState<string[]>([])
  const [showError, setError] = useState(false)

  const rootStore = useStores()
  
  // Pull in navigation via hook
  const navigation = useNavigation()

  const findCountries = () => {
    try{
      setResult(rootStore.findCountriesByTerm(term))
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
        text="Find Countries By Search Term"
      />

      <InputComponent 
        placeholder={'Write term'}
        variable={term}
        setVariable={val => setTerm(val)}
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
        result.map(country => {
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
