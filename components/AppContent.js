
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity, Text, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ChatScreen from '../screens/ChatScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import CoverLetterMachine from '../screens/CoverLetterMachine';

const AppContent = ({}) => {

    const [lightTheme, setLightTheme] = useState(true);

    const Tab = createMaterialTopTabNavigator();


    function Chat() {
        return (
            <View style={[styles.container, lightTheme ? styles.lightMode : styles.darkMode]}>
                <ChatScreen lightTheme={lightTheme}></ChatScreen>
            </View>
        );
    }

    const CoverLetter2 = useCallback(() => {
        return (
            <View style={[styles.container, lightTheme ? styles.lightMode : styles.darkMode]}>
                <CoverLetterMachine lightTheme={lightTheme}></CoverLetterMachine>
            </View>
        );
    },[]);

    return (
        <>
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        return <FontAwesome5 name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'black',
                    tabBarStyle: { ...styles.tabBarStyle },
                })}
            >
                <Tab.Screen name="AI-Cover Letter" component={CoverLetter2} />
                <Tab.Screen name="Chat" component={Chat} />
            </Tab.Navigator>
        </NavigationContainer>
      </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    font: {
        color: 'white'
    },

    tabBarStyle: {
        backgroundColor: '#0088B4',
        height: 80,
    },

    StatusBar: {

    },

    lightMode: {
        backgroundColor: 'white',
    },

    darkMode: {
        backgroundColor: 'black',
    },

    UnderBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    lightSwitch: {
        width: 60,
        height: 37,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'black',
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
});

export default AppContent;