import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  DeviceInfo,
  Platform,
} from 'react-native';
//fix from rn
import {WebView} from 'react-native-webview';
import ViewUtil from '../util/ViewUtil';
import NavigationBar from 'react-native-navbar-plus';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationUtil from '../navigator/NavigationUtil';
import BackPressComponent from '../common/BackPressComponent';
//fix from '../common/SafeAreaViewPlus';
import SafeAreaViewPlus from 'react-native-safe-area-plus';
const TRENDING_URL = 'https://github.com/';
const THEME_COLOR = '#678';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
    //fix this.params = this.props.route.params;
    this.params = this.props.route.params;
    const {projectModel} = this.params;
    this.url = projectModel.html_url || TRENDING_URL + projectModel.fullName;
    const title = projectModel.full_name || projectModel.fullName;
    this.state = {
      title: title,
      url: this.url,
      canGoBack: false,
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    this.onBack();
    return true;
  }

  onBack() {
    //高版本react-native-webview 在Android上存在webView.goBack()没有回调onNavigationStateChange的bug
    //在此bug 未修复之前可以直接通过NavigationUtil.goBack(this.props.navigation) 返回上一页来规避
    if (this.state.canGoBack && Platform.OS === 'ios') {
      this.webView.goBack();
    } else {
      NavigationUtil.goBack(this.props.navigation);
    }
  }

  renderRightButton() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => {}}>
          <FontAwesome
            name={'star-o'}
            size={20}
            style={{color: 'white', marginRight: 10}}
          />
        </TouchableOpacity>
        {ViewUtil.getShareButton(() => {})}
      </View>
    );
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url,
    });
  }

  render() {
    const titleLayoutStyle =
      this.state.title.length > 20 ? {paddingRight: 30} : null;
    let navigationBar = (
      <NavigationBar
        leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
        titleLayoutStyle={titleLayoutStyle}
        title={this.state.title}
        style={{backgroundColor: THEME_COLOR}}
        rightButton={this.renderRightButton()}
      />
    );

    return (
      <SafeAreaViewPlus topColor={THEME_COLOR}>
        <View style={styles.container}>
          {navigationBar}
          <WebView
            ref={webView => (this.webView = webView)}
            startInLoadingState={true}
            onNavigationStateChange={e => this.onNavigationStateChange(e)}
            source={{uri: this.state.url}}
          />
        </View>
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0,
  },
});
