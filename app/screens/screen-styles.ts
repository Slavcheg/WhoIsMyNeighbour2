import { StyleSheet } from "react-native";
import { color } from "../theme";

export const screenStyles = StyleSheet.create({
    screen: {
        // backgroundColor: color.palette.lighterGrey,
        flexGrow: 1,
        alignItems: 'center',
        paddingHorizontal: 20
    },
    
    heading: {
        color: color.palette.orange,
        alignSelf: 'center',
        marginBottom: 30,
        textAlign: 'center'
    },
    
    btnStyle: {
        width : '100%',
        borderRadius: 30,
        marginBottom: 30
    },
    
    btnTextStyle: {
        fontSize: 18
    }
})