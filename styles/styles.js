import { StyleSheet } from "react-native";

const lightMode = {
    lightInput: {
        justifyContent: 'flex-start',
        minHeight: 40,
        width: "98%",
        paddingLeft: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 26,
        color: 'black',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,

    },
    lightBG: {
        backgroundColor: 'white',
    },
    lightQuestion: {
        color: 'black',
        padding: 20,
        fontSize: 15,
    },
    touchableOpacity: {
        borderWidth: 2,
        height: 70,
        padding: 20,
        marginBottom: "80%",
        borderColor: 'black',
        borderRadius: 80,
    },
};

const darkMode = {
    darkInput: {
        justifyContent: 'flex-start',
        minHeight: 40,
        width: "98%",
        paddingLeft: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 26,
        color: 'white',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,

    },
    darkBG: {
        backgroundColor: 'black',
    },
    darkQuestion: {
        color: 'white',
        padding: 20,
        fontSize: 15,
    },
    touchableOpacity: {
        borderWidth: 2,
        height: 70,
        padding: 20,
        marginBottom: "80%",
        borderColor: 'white',
        borderRadius: 80,
    },
};

const coverLetterMachineStyles = {
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 16,
    },
    startButton: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0088B4',
        textAlign: 'center',
    },
    chatIcons: {
        flex: 1,
        marginLeft: 50,

    },
    answerContainer: {
        backgroundColor: 'gray',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'grey',
        width: "98%",
        
    },
};

const chatScreenStyles = {
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%',

    },
    answerContainer: {
        backgroundColor: 'gray', // Grey background color
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        width: "98%",
        height: "60%",
        borderColor: 'grey', // Border color
    },
    chatIcons: {
        flex: 1,
        marginLeft: 30,

    },
};

export const styles = StyleSheet.create({

    common: {
        chatContainerDefault: {
            width: 300,
            height: '85%',
            // borderWidth: 1,
            // borderColor: 'red',
            // backgroundColor: 'white',
            justifyContent: 'center',
            marginBottom: "5%",
            alignItems: 'center',
    
        },
        chatContainer: {
            width: 300,
            height: '85%',
            // borderWidth: 1,
            // borderColor: 'red',
            // backgroundColor: 'white',
            justifyContent: 'flex-end',
            marginBottom: "5%",
            alignItems: 'center',
    
        },
        buttonsContainer: {
            flexDirection: 'row',
            marginBottom: 30,
            // borderWidth: 1,
            // borderColor: 'green',
            padding: 20,
            width: "98%",
        },
        chatButton: {
            fontSize: 20,
            color: '#0088B4',
            textAlign: 'center',
        },
        scrollContainer: {
            maxHeight: 500,
        },
        answer: {
            fontSize: 16,
            color: 'white',
        },
        placeholderText: {
            color: 'white',
        },
        UnderBar: {
            height: 60,
            width: '100%',
            flexDirection: 'row',
            // backgroundColor: 'red',
            justifyContent: 'flex-end',
            padding: 20,
        },
        lightSwitch: {

        },
        SwitchIcon: {
            marginLeft: 10,
            width: 40,
            height: 40,
            textAlign: 'center',
            paddingTop: 7,
            paddingBottom: 7,
            borderRadius: 100,
        },
    },
    lightMode,
    darkMode,
    coverLetterMachineStyles,
    chatScreenStyles,
});