import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {Task} from '../services/stores/storesService';
import {colors} from '../stylesheet/colors';

interface StoreScreenModalProps {
  isVisible: boolean;
  onClose: () => void;
  task: Task | null;
}

const StoreScreenModal: React.FC<StoreScreenModalProps> = ({
  isVisible,
  onClose,
  task,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        onClose();
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            {task && task.assigned
              ? `The task '${task.description}' is already assigned, so you cannot check-in for it. Please choose another task or check back later.`
              : 'Check-in failed due to API unavailability. Please try again later!'}
          </Text>
          <TouchableOpacity
            onPress={() => onClose()}
            style={styles.modalButton}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    color: colors.backgroundColor,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: colors.primaryColor,
    padding: 10,
    borderRadius: 10,
  },
});

export default StoreScreenModal;
