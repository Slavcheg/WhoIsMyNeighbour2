import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View } from "react-native"
import { Screen, Text, Button } from "../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { color } from "../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.lighterGrey,
  flexGrow: 1,
  alignItems: 'center',
  paddingHorizontal: 20
}

const Heading: TextStyle = {
  color: color.palette.orange,
  alignSelf: 'center',
  marginBottom: 30
}

const btnStyle: ViewStyle = {
  width : '100%',
  borderRadius: 30,
  marginBottom: 30
}

const btnTextStyle: TextStyle = {
  fontSize: 18
}

export const HomeScreen: Component = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const rootStore = useStores()
  
  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text 
        style={Heading} 
        preset="header" 
        text={`Welcome to`}
      />
      <Text 
        style={Heading} 
        preset="header" 
        text={`Who Is My Neighbour`}
      />
      <Button
        style={btnStyle}
        textStyle={btnTextStyle}
        text={'Find distance'}
        onPress={() => console.log(rootStore.getDistanceByAlpha3Code('ARM', 'ABW'))}
      ></Button>

      <Button
        style={btnStyle}
        textStyle={btnTextStyle}
        text={'Find closest non - neighbour'}
        onPress={() => console.log(rootStore.findClosestNonNeighbour('BGR'))}
      ></Button>

      <Button
        style={btnStyle}
        textStyle={btnTextStyle}
        text={'Find countries within timezones'}
        onPress={() => console.log(rootStore.findCountriesBetweenTimezones('UTC+01:00', 'UTC+03:00'))}
      ></Button>

      <Button
        style={btnStyle}
        textStyle={btnTextStyle}
        text={'Find countries by search term'}
        onPress={() => console.log(rootStore.findCountriesByTerm('ka'))}
      ></Button>

      <View
        style={[{
          flexGrow: 1
        }]}
      ></View>

      <Button
        style={[btnStyle]}
        textStyle={btnTextStyle}
        text={'Log out'}
      ></Button>

    </Screen>
  )
})
