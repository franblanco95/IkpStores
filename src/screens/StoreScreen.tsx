import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainNavigation';
import {colors} from '../stylesheet/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import StoreTasks from '../components/StoreTasks';
import StoreShippingMethods from '../components/StoreShippingMethods';
import StoreScreenModal from '../components/StoreScreenModal';
import {Task} from '../services/stores/storesService';
import Divider from '../components/Divider';

type StoreScreenProps = NativeStackScreenProps<MainStackParamList, 'Store'>;

const height = Dimensions.get('window').height;

const StoreScreen: React.FC<StoreScreenProps> = ({navigation, route}) => {
  const {store} = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleCheckin = (task: Task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        style={styles.backgroundImage}
        source={{uri: store.image}}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={32} color={'white'} />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.descriptionWrapper}>
        <View
          style={[
            styles.storeStatusContainer,
            {backgroundColor: store.open ? 'green' : 'grey'},
          ]}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            {store.open ? 'Open' : 'Closed'}
          </Text>
        </View>

        <Text style={styles.storeTitle}>{store.name}</Text>

        <View style={styles.storeInfoContainer}>
          <Entypo name="shop" size={26} color={colors.secondaryColor} />

          <Text style={styles.storeInfo}>
            {store.schedule.from} to {store.schedule.end}
          </Text>
        </View>
        <View style={styles.storeInfoContainer}>
          <Entypo name="location-pin" size={27} color={colors.secondaryColor} />
          <Text style={styles.storeInfo}>{store.address.direction}</Text>
        </View>

        <Divider />

        <StoreTasks tasks={store.tasks} onCheckin={handleCheckin} />

        <StoreShippingMethods shippingMethods={store.shipping_methods} />
      </View>
      <StoreScreenModal
        isVisible={isModalVisible}
        onClose={closeModal}
        task={selectedTask}
      />
    </ScrollView>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  backgroundImage: {
    backgroundColor: 'lightgrey',
    height: height * 0.5,
  },
  backIcon: {
    marginTop: 60,
    marginLeft: 20,
  },
  descriptionWrapper: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    marginTop: -20,
    borderRadius: 25,
    padding: 20,
  },
  storeStatusContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'green',
    position: 'absolute',
    right: 40,
    top: -20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  storeTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.primaryColor,
    marginBottom: 10,
  },
  storeInfo: {
    flex: 1,
    fontSize: 13,
    color: 'grey',
    marginLeft: 10,
  },
  storeInfoContainer: {
    marginVertical: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
