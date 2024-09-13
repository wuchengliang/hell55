import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getBoarding} from '../util/BoardingUtil';
import NavigationUtil from '../navigator/NavigationUtil';

export default class Index extends Component {
  componentDidMount() {
    this.doLanuch();
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  async doLanuch() {
    const boarding = await getBoarding();
    const {navigation} = this.props;
    this.timer = setTimeout(() => {
      if (boarding) {
        NavigationUtil.resetToHomPage({navigation});
      } else {
        NavigationUtil.login({navigation});
      }
    }, 1000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>huanying</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
