import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather } from '@expo/vector-icons';


import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                });
                setFavorites(favoritedTeachersIds);
            }
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites();
        }, [])
    );

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit() {
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setIsFiltersVisible(false);
        setTeachers(response.data);
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >
                { isFiltersVisible && (
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.searchForm}> 
                                <Text style={styles.label}>Matéria</Text>
                                <TextInput
                                    style={styles.input}
                                    value={subject}
                                    onChangeText={text => setSubject(text)}
                                    placeholder="Qual a matéria?"
                                    placeholderTextColor="#c1bccc"
                                />

                                <View style={styles.inputGroup}>
                                    <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Dia da Semana</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={week_day}
                                        onChangeText={text => setWeekDay(text)}
                                        placeholder="Qual o dia?"
                                        placeholderTextColor="#c1bccc"
                                    />
                                    </View>

                                    <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Horário</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={time}
                                        onChangeText={text => setTime(text)}
                                        placeholder="Qual horário?"
                                        placeholderTextColor="#c1bccc"
                                    />
                                    </View>
                                </View>

                                <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                                    <Text style={styles.submitButtonText}>Filtrar</Text>
                                </RectButton>
                            </View>
                        </TouchableWithoutFeedback>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherlist}
                contentContainerStyle={{
                    paddingBottom: 16,
                    paddingHorizontal: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
                
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default TeacherList;