import React, { useEffect, useState, useRef } from 'react';
import { Image, TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Task } from '../components/TasksList';
import trashIcon from '../assets/icons/trash/trash.png'
import edit from '../assets/icons/trash/edit.png'


interface TaskItemProps {
    task: Task;
    editTask: (taskId: number, taskNewTitle: string) => void;
    removeTask: (id: number) => void;
    toggleTaskDone: (id: number) => void;
    index: Number;
}

export function TaskItem({ task, editTask, removeTask, toggleTaskDone, index }: TaskItemProps) {
    const [isTaskEditing, setIsTaskEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task.title);
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setIsTaskEditing(true);
    }

    function handleCancelEditing() {
        setEditedTask(task.title);
        setIsTaskEditing(false);
    }

    function handleSubmitEditing() {
        editTask(task.id, editedTask);
        setIsTaskEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isTaskEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }

    }, [isTaskEditing]);
    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        ref={textInputRef}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        value={editedTask}
                        onChangeText={setEditedTask}
                        editable={isTaskEditing}
                        onSubmitEditing={handleSubmitEditing}
                    >
                    </TextInput>
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity
              testID={`edit-${index}`}
              style={{ paddingHorizontal: 24 }}
              onPress={() => setIsTaskEditing(true)}
            >
              <Image source={trashIcon} />
            </TouchableOpacity> */}
            <View style={styles.iconsContainer} >
                {isTaskEditing ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleStartEditing}
                    >
                        <Image source={edit} style={{opacity: 0.7}} />
                    </TouchableOpacity>
                )}

                <View
                    style={styles.iconsDivider}
                />

                <TouchableOpacity
                    disabled={isTaskEditing}
                    onPress={() => removeTask(task.id)}
                >
                    <Image source={trashIcon} style={{ opacity: isTaskEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row',
        marginRight: 20,
        alignItems: 'center'
    },
    iconsDivider:{
        width: 1,
        height: 24,
        backgroundColor: '#b2b2b2',
        opacity: 0.2,
        margin: 5
    }
})