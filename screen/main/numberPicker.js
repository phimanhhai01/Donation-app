import React, { Component } from 'react';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {View, Text} from 'react-native';
export default class SimpleExample extends Component {
  state = {
    selectedIndex: 9
  }

  reset = () => {
    this.setState({
      selectedIndex: 9
    })
  }
  render() {
    return (
      <ScrollPicker
        dataSource={['992', '993', '994', '995', '996', '997', '998', '999', '1000', '0', '1', '2', '3', '4']}
        selectedIndex={9}
        renderItem={(data, index) => {
          return (
              <View>
                  <Text>{data}</Text>
              </View>
          )
        }}
        onValueChange={(data, selectedIndex) => {
          this.props.setNumberPickerValue(data);
        }}
        wrapperHeight={180}
        wrapperWidth={150}
        wrapperColor='#FFFFFF'
        itemHeight={60}
        highlightColor='black'
        highlightBorderWidth={2}
        itemTextStyle={{color: 'black'}}
      />
    );
  }
}
