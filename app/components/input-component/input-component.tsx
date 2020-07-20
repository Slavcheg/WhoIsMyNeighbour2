import React, { useEffect, useState } from "react"
import { View, TextInput, StyleSheet } from "react-native";
import { color, spacing } from "../../theme";

export function InputComponent({placeholder, variable, setVariable, isPassword = false}){

    return (
        <View
            style={[
                // border_boxes().black,
                {
                width: '100%',
                marginVertical: 20
            }]}
        >

            <TextInput
                autoCapitalize={'none'}
                autoCompleteType="off"
                autoCorrect={false}
                value={variable}
                onChangeText={x => setVariable(x)}
                style={styles.inputContainerStyle}          
                placeholder={placeholder}
                defaultValue={variable}
                secureTextEntry={isPassword}
            ></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainerStyle: {
        // backgroundColor: color.palette.grey_sbs,
        width: '100%',
        paddingLeft: spacing[4],
        borderBottomColor: color.palette.orange,
        borderRadius: 4,
    },
    inputTextStyle: {
        fontSize: 20,
        opacity: 0.5
    }
})