import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from '../stylesheet/colors';
import {Task} from '../services/stores/storesService';

interface StoreTasksProps {
  tasks: Task[];
  onCheckin: (task: Task) => void;
}

const StoreTasks: React.FC<StoreTasksProps> = ({tasks, onCheckin}) => {
  return (
    <>
      <Text style={styles.storeSubtitle}>Tasks</Text>
      {tasks.map(task => (
        <TouchableOpacity
          onPress={() => onCheckin(task)}
          key={task.id}
          style={[
            styles.taskContainer,
            {
              backgroundColor: task.assigned
                ? colors.secondaryColor
                : 'lightgrey',
            },
          ]}>
          <Text style={styles.taskTitle}>
            {task.description} - {task.assigned ? 'Assigned' : 'Unassigned'}
          </Text>
        </TouchableOpacity>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  storeSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryColor,
    marginBottom: 10,
  },
  taskContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: colors.secondaryColor,
    borderRadius: 10,
  },
  taskTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default StoreTasks;
