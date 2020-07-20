import React, { useEffect, useState, FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { Screen, Text, InputComponent, Button } from "../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import {screenStyles} from './screen-styles'

export const LogInScreen: Component = observer(function LogInScreen() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setError] = useState(false)

  const rootStore = useStores()
  
  const navigation = useNavigation()

  useEffect(() => {
    rootStore.loadCountries()
  }, [])

  const logIn = () => {
    if(username === 'admin' && password === 'admin123'){
      navigation.navigate('home')
    } else {
      setError(true)
    }
  }
  return (
    <Screen style={screenStyles.screen} preset="scroll">
      <Text 
        style={screenStyles.heading} 
        preset="header" 
        text={`Welcome to`}
      />
      <Text 
        style={screenStyles.heading} 
        preset="header" 
        text={`Who Is My Neighbour`}
      />

      <InputComponent 
        placeholder={'Username'}
        variable={username}
        setVariable={val => setUsername(val)}
      />

      <InputComponent 
        placeholder={'Password'}
        variable={password}
        setVariable={val => setPassword(val)}
        isPassword={true}
      />

      <Button
        style={screenStyles.btnStyle}
        textStyle={screenStyles.btnTextStyle}
        text={'Login'}
        onPress={() => logIn()}
      ></Button>
      
      {
        showError ?
            <Text
              style={screenStyles.heading} 
              text={'Wrongfull credentials'}
            />
        : null
      } 
    </Screen>
  )
})
