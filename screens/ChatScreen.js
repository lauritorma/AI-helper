// screens/ChatScreen.js
import React, { useState, useRef, useCallback } from 'react';
import { View, Switch, TextInput, Button, TouchableWithoutFeedback, KeyboardAvoidingView, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import API_KEY from '../config/OpenaiConfig';
import { styles } from '../styles/styles';



const ChatScreen = () => {

    const OPENAI_API_KEY = API_KEY;

    const [userInput, setUserInput] = useState('');
    const [inputHeight, setInputHeight] = useState(40);
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [answerLoaded, setAnswerLoaded] = useState(false);
    const answerContainerRef = useRef(null);
    const [lightTheme, setLightTheme] = useState(true);

    const handleToggleMode = () => {
        setLightTheme((prevTheme) => !prevTheme);
    };

    const handleChat = async () => {
        setAnswer('');
        setLoading(true);
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: userInput }],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    },
                }
            );

            setAnswer(response.data.choices[0].message.content);
        } catch (error) {
            console.error('Error fetching OpenAI API:', error.message);
        } finally {
            setLoading(false);
            setAnswerLoaded(true);
        }
    };

     // Handler for copying answer to clipboard
     const handleLongPressAnswerContainer = () => {
        if (answer === '') {
            console.error('Error copying to clipboard - Answer is empty')
        } else {
            Clipboard.setString(answer);
        }
    };

    //Handler for clearing answer

    const handleClearAnswer = () => {
        setAnswer('');
        setUserInput('');
        setAnswerLoaded(false);
    };

    const handleContentSizeChange = (contentWidth, contentHeight) => {
        // Update the input's height based on the contentHeight
        setInputHeight(contentHeight < 40 ? 40 : contentHeight); // Set a minimum height of 40
      };
    return (
        <>
            <KeyboardAvoidingView style={[styles.chatScreenStyles.container, lightTheme ? styles.lightMode.lightBG : styles.darkMode.darkBG]}>
                <View style={[answerLoaded ? styles.common.chatContainer : styles.common.chatContainerDefault]}>
                    <TextInput
                        multiline={true}
                        style={[lightTheme ? styles.lightMode.lightInput : styles.darkMode.darkInput]}
                        placeholder="Type your message here"
                        placeholderTextColor="#0088B4"
                        onChangeText={(text) => setUserInput(text)}
                        onContentSizeChange={(e) =>
                            handleContentSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height)
                        }
                        value={userInput}
                    />

                    <View style={styles.common.buttonsContainer}>
                        <TouchableOpacity onPress={handleChat} style={styles.chatScreenStyles.chatIcons}>
                            <Text style={styles.common.chatButton}>Chat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClearAnswer} style={styles.chatScreenStyles.chatIcons}>
                        <FontAwesome5 name={'trash'} size={25} color={lightTheme ? 'black' : 'white'} />
                        </TouchableOpacity>
                    </View>
                    {loading && (
                        <ActivityIndicator />
                    )}
                    {answerLoaded && (
                        <View  ref={answerContainerRef} style={styles.chatScreenStyles.answerContainer}>
                            <ScrollView style={styles.common.scrollContainer}>
                            <TouchableWithoutFeedback onLongPress={handleLongPressAnswerContainer}>
                                {answer !== '' ? (
                                    <Text style={styles.common.answer}>{answer}</Text>
                                ) : (
                                    <Text style={styles.common.placeholderText}>...</Text>
                                )}
                            </TouchableWithoutFeedback>
                            </ScrollView>
                        </View>
                    )}
                </View>
                <View style={[styles.common.UnderBar, lightTheme ? styles.lightMode.lightBG : styles.darkMode.darkBG]}>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={lightTheme ? '#f5dd4b' : '#f4f3f4'}
                        onValueChange={handleToggleMode}
                        value={lightTheme}
                        style={styles.common.lightSwitch}
                    />
                    <FontAwesome5
                        name={lightTheme ? 'moon' : 'lightbulb'}
                        size={24}
                        color={lightTheme ? 'black' : 'white'}
                        style={styles.common.SwitchIcon}
                    />
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

export default ChatScreen;
