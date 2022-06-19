import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type TasksEdit = {
  id: number;
  title: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  interface Task {
    id: number;
    title: string;
    done: boolean;
  }

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    if (tasks.find(item => item.title === data.title)) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          { text: "OK", style: "default" }
        ],
      );
    } else {
      setTasks(oldState => [...oldState, data])
    }
  }

  function handleToggleTaskDone(id: number) {
    const newState = tasks.map(task => {
      if (task.id === id) {
        return {...task, done: !task.done};
      }
      return task;
    });

    setTasks(newState)
  }

  function handleEditTask({id, title} : TasksEdit) {
    const newState = tasks.map(task => {
      if (task.id === id) {
        return {...task, title: title};
      }
      return task;
    });

    setTasks(newState)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => console.log("Item não excluído"),
          style: "cancel"
        },
        { text: "Sim", onPress: () => {
          const newTasks = tasks.filter(item => item.id !== id)
          setTasks(newTasks)
        }, style: "default" }
      ],
    );
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