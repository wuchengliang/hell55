import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';
import {Button} from 'react-native';
class MyPage extends Component {
  render() {
    const {onThemeChange} = this.props;
    return (
      <View style={styles.container}>
        <Text>最热</Text>
        <Button
          title="改变主题"
          onPress={() => {
            onThemeChange({themeColor: 'yellow'});
          }}></Button>
      </View>
    );
  }
}
//将dispatch映射给onThemeChange，然后注入到组件的props中
const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});
//包装 component，注入 dispatch到PopularTab
export default connect(null, mapDispatchToProps)(MyPage);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
