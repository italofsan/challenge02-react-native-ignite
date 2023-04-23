import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundTask = tasks.find(f => f.title === newTaskTitle);
    if (foundTask) {
      Alert.alert("Task já cadastrada","Você não pode cadastrar uma task com o mesmo nome");
      return;
    }
    const task: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldState => [...oldState, task]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const taskToUpdate = updatedTasks.find(f => f.id === id);
    if(!taskToUpdate){
      return;
    }
    taskToUpdate.done = !taskToUpdate.done;
    setTasks(updatedTasks);
    }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?",[
      {
      text: 'Não'
      },
      {
      text: 'Sim',
      onPress: () => setTasks(oldState => oldState.filter(
        task => task.id !== id
        ))
      }
    ])
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const taskToUpdate = updatedTasks.find(f => f.id === taskId);
    if(!taskToUpdate){
      return;
    }
    taskToUpdate.title = taskNewTitle;
    setTasks(updatedTasks);
  }
  

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})