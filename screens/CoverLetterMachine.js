import React, { useState, useRef, memo } from 'react';
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Switch
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import API_KEY from '../config/OpenaiConfig';
import { styles } from '../styles/styles';
// import { EXPO_PUBLIC_API_KEY } from '@env';

const CoverLetterMachine = ({ }) => {

    const OPENAI_API_KEY = API_KEY;

    const [questions, setQuestions] = useState([
        'What position are you applying for?',
        'Personal info (e.g., name, age)',
        'Job description',
        'Skills (e.g., teamwork, languages)',
        'Education',
        'Any additional information you want to include'
    ]);
    const [userResponses, setUserResponses] = useState(Array(questions.length).fill(''));
    const [inputHeight, setInputHeight] = useState(40);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [answerLoaded, setAnswerLoaded] = useState(false);
    const [showStart, setShowStart] = useState(true);
    const [showAnswerContainer, setShowAnswerContainer] = useState(true);
    const [showInputField, setShowInputField] = useState(true);
    const [showCancel, setShowCancel] = useState(false);
    const [generation, setGeneration] = useState(false);
    const answerContainerRef = useRef(null);
    const [lightTheme, setLightTheme] = useState(true);

    const handleToggleMode = () => {
        setLightTheme((prevTheme) => !prevTheme);
    };

    const handleStart = () => {
        setUserResponses(Array(questions.length).fill(''));
        setCurrentQuestionIndex(0);
        setAnswer('');
        setAnswerLoaded(false);
        setLoading(false);
        setShowStart(false);
        setShowCancel(true);
        setShowAnswerContainer(true);
        setShowInputField(true);
        setGeneration(true);
    };

    
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            // All questions answered, show submit button
            setCurrentQuestionIndex(0); // Reset current question index
            setShowStart(false);
            setShowAnswerContainer(true);
            setShowInputField(false);
        }
    };

    const handleContentSizeChange = (contentWidth, contentHeight) => {
        // Update the input's height based on the contentHeight
        setInputHeight(contentHeight < 40 ? 40 : contentHeight); // Set a minimum height of 40
      };

    const handleChat = async () => {
        setLoading(true);

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: questions.map((question, index) => ({
                        role: 'user',
                        content: `Generate a cover letter with information I will now present. Length should be one A4.
                        ${question}: ${userResponses[index]}`,
                    })),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${OPENAI_API_KEY}`,
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

    // Handler for clearing answer
    const handleClearAnswer = () => {
        setAnswer('');
        setShowStart(true);
        setShowCancel(false);
        setAnswerLoaded(false);
        setGeneration(false);
    };

    return (
        <>
            <KeyboardAvoidingView style={[styles.coverLetterMachineStyles.container, lightTheme ? styles.lightMode.lightBG : styles.darkMode.darkBG]}>
                {showStart && (
                    <TouchableOpacity onPress={handleStart} style={ lightTheme ? styles.lightMode.touchableOpacity : styles.darkMode.touchableOpacity}>
                        <Text style={styles.coverLetterMachineStyles.startButton}>Generate cover letter</Text>
                    </TouchableOpacity>
                )}
                {generation && (
                    <View style={[answerLoaded ? styles.common.chatContainer : styles.common.chatContainerDefault]}>
                        <Text style={[lightTheme ? styles.lightMode.lightQuestion: styles.darkMode.darkQuestion]}>{questions[currentQuestionIndex]}</Text>
                        
                            <TextInput
                                multiline={true}
                                style={[lightTheme ? styles.lightMode.lightInput : styles.darkMode.darkInput]}
                                placeholder={`Enter your response for "${questions[currentQuestionIndex]}"`}
                                placeholderTextColor="#0088B4"
                                onChangeText={(text) => {
                                    const updatedResponses = [...userResponses];
                                    updatedResponses[currentQuestionIndex] = text;
                                    setUserResponses(updatedResponses);
                                }}
                                onContentSizeChange={(e) =>
                                    handleContentSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height)
                                }
                                value={userResponses[currentQuestionIndex]}
                            />
                        
                        <View style={styles.common.buttonsContainer}>
                            {currentQuestionIndex < questions.length - 1 && (
                                <TouchableOpacity
                                    onPress={handleNextQuestion}
                                    style={styles.coverLetterMachineStyles.chatIcons}
                                >
                                    <Text style={styles.common.chatButton}>Next</Text>
                                </TouchableOpacity>
                            )}
                            {currentQuestionIndex === questions.length - 1 && (
                                <TouchableOpacity
                                    onPress={handleChat}
                                    style={styles.coverLetterMachineStyles.chatIcons}>
                                    <Text style={styles.common.chatButton}>Submit</Text>
                                </TouchableOpacity>
                            )}
                            {showCancel && (
                                <TouchableOpacity
                                    onPress={handleClearAnswer}
                                    style={styles.coverLetterMachineStyles.chatIcons}>
                                    <Text style={styles.common.chatButton}>Clear</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        </View>
                )}
                        {loading && (
                        <ActivityIndicator />
                    )}
                        {answerLoaded && (
                            <View style={[answerLoaded ? styles.common.chatContainer : styles.common.chatContainerDefault]}>
                                <View style={styles.common.buttonsContainer}>
                                <TouchableOpacity
                                    onPress={handleStart}
                                    style={styles.coverLetterMachineStyles.chatIcons}>
                                    <FontAwesome5 name={'plus'} size={25} color={lightTheme ? 'black' : 'white'} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleClearAnswer}
                                    style={styles.coverLetterMachineStyles.chatIcons}>
                                    <FontAwesome5 name={'trash'} size={25} color={lightTheme ? 'black' : 'white'} />
                                </TouchableOpacity>
                                </View>
                            <ScrollView style={styles.common.scrollContainer}>
                                <TouchableWithoutFeedback onLongPress={handleLongPressAnswerContainer}>
                                    <View ref={answerContainerRef} style={styles.coverLetterMachineStyles.answerContainer}>
                                            <View>
                                                {answer !== '' ? (
                                                    <Text style={styles.common.answer}>{answer}</Text>
                                                ) : (
                                                    <Text style={styles.common.placeholderText}>...</Text>
                                                )}
                                            </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                            </View>
                        )}
                    
                <View style={[styles.common.UnderBar, lightTheme ? styles.lightMode.lightBG : styles.lightMode.darkBG]}>
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
export default CoverLetterMachine;
