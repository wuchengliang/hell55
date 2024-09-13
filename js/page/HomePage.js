import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import SafeAreaViewPlus from 'react-native-safe-area-plus';
import {connect} from 'react-redux';
import actions from '../action';

class Index extends Component {
  render() {
    NavigationUtil.navigation = this.props.navigation;
    const themeColor = this.props.theme.themeColor || this.props.theme;
    return (
      <SafeAreaViewPlus topColor={themeColor}>
        <DynamicTabNavigator />
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const mapStateToProps = state => ({
  theme: state.theme.theme,
});
//包装 component，注入 dispatch到PopularTab
export default connect(mapStateToProps)(Index);
