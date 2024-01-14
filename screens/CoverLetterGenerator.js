// screens/ChatScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ScrollView,  ActivityIndicator } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
// import { EXPO_PUBLIC_API_KEY } from '@env';



const CoverLetterGenerator = () => {

    const API_KEY='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';

    const [personalInfo, setPersonalInfo] = useState('');
    const [userJob, setUserJob] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [skills, setSkills] = useState('');
    const [education, setEducation] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChat = async () => {
        setAnswer('');
        setLoading(true);
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{
                        role: 'user', content: `Generate a cover letter with information I will now present. Length should be one A4.
                                    personal info: ${personalInfo},
                                    job title: ${userJob},
                                    job description: ${jobDesc},
                                    my skills: ${skills},
                                    my education: ${education},
                                    additional info: ${additionalInfo} `
                    }],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`,
                    },
                }
            );

            setAnswer(response.data.choices[0].message.content);
        } catch (error) {
            console.error('Error fetching OpenAI API:', error.message);
        } finally {
            setLoading(false);
        }
    };

    //Handler for copying answer to clipboard

    const handleCopyToClipboard = () => {
        Clipboard.setString(answer);
    };

    //Handler for clearing answer

    const handleClearAnswer = () => {
        setAnswer('');
    };
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.inputContainerShort}>
                    <TextInput
                        multiline={true}
                        style={styles.input}
                        placeholder="Enter your personal info (e.g. name, age)"
                        placeholderTextColor="#0088B4"
                        onChangeText={(text) => setPersonalInfo(text)}
                        value={personalInfo}
                    />
                    <View style={styles.divider}></View>
                </View>
                <View style={styles.inputContainerShort}>
                    <TextInput
                        multiline={true}
                        style={styles.input}
                        placeholder="Enter the job title"
                        placeholderTextColor="#0088B4"
                        onChangeText={(text) => setUserJob(text)}
                        value={userJob}
                    />
                    <View style={styles.divider}></View>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        multiline={true}
                        style={styles.input}
                        placeholder="Enter the job description"
                        placeholderTextColor="#0088B4"
                        onChangeText={(text) => setJobDesc(text)}
                        value={jobDesc}
                    />
                    <View style={styles.divider}></View>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        multiline={true}
                        style={styles.input}
                        placeholder="Describe your skills (e.g. teamwork, languages)"
                        placeholderTextColor="#0088B4"
                        onChangeText={(text) => setSkills(text)}
                        value={skills}
                    />
                    <View style={styles.divider}></View>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        multiline={true}
                        style={styles.input}
                        placeholder="Describe your education"
                        placeholderTextColor="#0088B4"
                        onChangeText={(text) => setEducation(text)}
                        value={education}
                    />
                    <View style={styles.divider}></View>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        multiline={true}
                        style={styles.input}
                        placeholder="Enter any additional info"
                        placeholderTextColor="#0088B4"
                        onChangeText={(text) => setAdditionalInfo(text)}
                        value={additionalInfo}
                    />
                    <View style={styles.divider}></View>
                </View>
                <View style={styles.answerContainer}>
                    
                {loading ? (
                    <ActivityIndicator size="large" color="white" />
                ) : (
                    <View>
                    {answer !== '' ? (
                        <Text style={styles.answer}>{answer}</Text>
                    ) : (
                        <Text style={styles.placeholderText}>...</Text>
                    )}
                    </View>
                )}
                </View>
            </ScrollView>
            <View style={styles.buttonsContainer}>
                <Button title="Generate" onPress={handleChat} style={[styles.chatIcons, styles.buttonMargin]} />
                <Button title="Clear" onPress={handleClearAnswer} style={[styles.chatIcons, styles.buttonMargin]} />
                <Button title="Copy" onPress={handleCopyToClipboard} style={[styles.chatIcons, styles.buttonMargin]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,

    },
    inputContainer: {
        width: 300,
        height: 60,
        borderWidth: 1,
        marginBottom: 30,
        
    },
    inputContainerShort: {
        width: 300,
        height: 60,
        borderWidth: 1,
        marginBottom: 30,
        marginTop: 30,
        
    },
    input: {
        justifyContent: 'flex-start',
        paddingLeft: 8,
        fontSize: 16,
        color: 'white',

    },
    placeholderText: {
        color: 'white',
    },
    answerContainer: {
        marginTop: 16,
        backgroundColor: 'gray',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'grey',
        flex: 1, // Make the answerContainer flexible in height
        borderColor: 'grey', // Border color
    },
    scrollContainer: {
        flexGrow: 1,
        maxHeight: 400,
    },
    answer: {
        fontSize: 16,
        color: 'white',
        
    },
    chatIcons: {
        flex: 1,

    },
    buttonMargin: {
        marginRight: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        marginTop: 20,
        justifyContent: 'center',
    },
    divider: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 1,
        backgroundColor: 'white', // Set the divider color here
      },
});

export default CoverLetterGenerator;
