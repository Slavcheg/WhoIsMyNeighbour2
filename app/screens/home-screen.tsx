import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import { Screen, Text, Button } from "../components"
import { useNavigation } from "@react-navigation/native"
import {screenStyles} from './screen-styles'

export const HomeScreen: Component = observer(function HomeScreen() {
  const navigation = useNavigation()
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
      <Button
        style={screenStyles.btnStyle}
        textStyle={screenStyles.btnTextStyle}
        text={'Find distance'}
        // onPress={() => console.log(rootStore.getDistanceByAlpha3Code('ARM', 'ABW'))}
        onPress={() => navigation.navigate('findDistance')}
      ></Button>

      <Button
        style={screenStyles.btnStyle}
        textStyle={screenStyles.btnTextStyle}
        text={'Find closest non - neighbour'}
        onPress={() => navigation.navigate('findClosestNonNeighbour')}
        // onPress={() => console.log(rootStore.findClosestNonNeighbour('BGR'))}
      ></Button>

      <Button
        style={screenStyles.btnStyle}
        textStyle={screenStyles.btnTextStyle}
        text={'Find countries within timezones'}
        onPress={() => navigation.navigate('findCountriesWithinTimezones')}
        // onPress={() => console.log(rootStore.findCountriesBetweenTimezones('UTC+01:00', 'UTC+03:00'))}
      ></Button>

      <Button
        style={screenStyles.btnStyle}
        textStyle={screenStyles.btnTextStyle}
        text={'Find countries by search term'}
        onPress={() => navigation.navigate('findCountriesBySearchTerm')}
        // onPress={() => console.log(rootStore.findCountriesByTerm('ka'))}
      ></Button>

      <View
        style={[{
          flexGrow: 1
        }]}
      ></View>

      <Button
        style={screenStyles.btnStyle}
        textStyle={screenStyles.btnTextStyle}
        text={'Log out'}
        onPress={() => navigation.navigate('login')}
      ></Button>

    </Screen>
  )
})
