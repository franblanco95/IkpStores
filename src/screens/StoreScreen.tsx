import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainNavigation';
import {colors} from '../stylesheet/colors';
import Entypo from 'react-native-vector-icons/Entypo';

type StoreScreenProps = NativeStackScreenProps<MainStackParamList, 'Store'>;

const height = Dimensions.get('window').height;

const StoreScreen: React.FC<StoreScreenProps> = ({navigation, route}) => {
  const {store} = route.params;

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

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Entypo name="shop" size={27} color={colors.secondaryColor} />

          <Text style={styles.storeInfo}>
            {store.schedule.from} a {store.schedule.end}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Entypo name="location-pin" size={27} color={colors.secondaryColor} />
          <Text style={styles.storeInfo}>{store.address.direction}</Text>
        </View>

        <Text style={styles.storeSubtitle}>Tasks</Text>

        {store.tasks.map(task => (
          <View
            key={task.id}
            style={[
              styles.taskContainer,
              {
                backgroundColor: task.assigned
                  ? colors.secondaryColor
                  : 'lightgrey',
              },
            ]}>
            <Text>{task.description}</Text>
            <Text>{task.assigned ? 'Asignada' : 'No Asignada'}</Text>
          </View>
        ))}

        <Text style={styles.storeSubtitle}>Shipping Methods</Text>

        {store.shipping_methods.map(method => (
          <View key={method.id} style={styles.taskContainer}>
            <Text>{method.name}</Text>
            <Text>{method.description}</Text>
          </View>
        ))}
      </View>
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
    fontSize: 13,
    color: 'grey',
    marginLeft: 10,
  },
  storeSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryColor,
    marginVertical: 10,
  },
  taskContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: colors.secondaryColor,
    borderRadius: 10,
  },
});
