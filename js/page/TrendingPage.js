import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import keys from '../res/data/langs.json';
import {tabNav} from '../navigator/NavigationDelegate';
import NavigationBar from 'react-native-navbar-plus';

export default class Index extends Component {
  render() {
    let navigationbar = (
      <NavigationBar title={'趋势'} style={{backgroundColor: '#439588'}} />
    );
    const TabNavigator = keys.length
      ? tabNav({Component: TrendingTab, theme: {themeColor: '#439588'}, keys})
      : null;

    return (
      <View style={styles.container}>
        {navigationbar}
        {TabNavigator}
      </View>
    );
  }
}
class TrendingTab extends Component {
  render() {
    const {tabLabel} = this.props;
    return <Text>{tabLabel}</Text>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
