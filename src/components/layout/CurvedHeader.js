import React from 'react';
import { StyleSheet, View, Text, Dimensions, StatusBar } from 'react-native';
import { appColors } from '../../util/constant';

export default function CurvedHeader({title}) {
  return (
    <View style={styles.container}>
                  {/* <StatusBar style="auto" /> */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height:70,
    backgroundColor: appColors.PRIMARY,
    // borderBottomStartRadius:30
  },
  headerContainer: {
    marginTop: 10,
    marginHorizontal: 10
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 15
  }
});