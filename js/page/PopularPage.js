import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import keys from '../res/data/keys.json';
import {tabNav} from '../navigator/NavigationDelegate';
import NavigationBar from 'react-native-navbar-plus';
import {connect} from 'react-redux';
import actions from '../action';
export default class Index extends Component {
  render() {
    let navigationbar = <NavigationBar title={'最热'} />;
    const TabNavigator = keys.length
      ? tabNav({
          Component: PopularTabPage,
          theme: {themeColor: '#2196f3'},
          keys,
        })
      : null;

    return (
      <View style={styles.container}>
        {navigationbar}
        {TabNavigator}
      </View>
    );
  }
}
class PopularTab extends Component {
  render() {
    const {tabLabel, onThemeChange} = this.props;
    return (
      <View>
        <Text>{tabLabel}</Text>
      </View>
    );
  }
}
//将dispatch映射给onThemeChange，然后注入到组件的props中
const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});
//包装 component，注入 dispatch到PopularTab
const PopularTabPage = connect(null, mapDispatchToProps)(PopularTab);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
