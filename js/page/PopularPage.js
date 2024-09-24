import React, {Component} from 'react';
import {
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import keys from '../res/data/keys.json';
import {tabNav} from '../navigator/NavigationDelegate';
import NavigationBar from 'react-native-navbar-plus';
import {connect} from 'react-redux';
import actions from '../action';
import store from '../store';
import PopularItem from '../common/PopularItem';
import Toast from 'react-native-easy-toast';
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red';
class PopularPage extends Component {
  _tabNav() {
    const {theme} = this.props;
    //注意：主题发生变化需要重新渲染top tab
    if (theme !== this.theme || !this.tabNav) {
      //优化效率：根据需要选择是否重新创建建TabNavigator，通常tab改变后才重新创建
      this.theme = theme;
      this.tabNav = tabNav({
        Component: PopularTabPage,
        keys,
        theme,
      });
    }
    return this.tabNav;
  }
  render() {
    const themeColor = this.props.theme.themeColor || this.props.theme;
  //  const themeColor = '#2196f3'
    let statusBar = {
      backgroundColor: themeColor,
      barStyle: 'light-content',
    };
    let navigationbar = (
      <NavigationBar
        title={'最热'}
        statusBar={statusBar}
        style={{backgroundColor: themeColor}}
      />
    );
    const TabNavigator = keys.length ? this._tabNav() : null;

    return (
      <View style={styles.container}>
        {navigationbar}
        {TabNavigator}
      </View>
    );
  }
}
const mapPopularStateToProps = (state) => ({
  theme: state.theme.theme,
});
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapPopularStateToProps, null,)(PopularPage);
const pageSize = 10; //设为常量，防止修改
class PopularTab extends Component {
  constructor(props) {
    super(props);
    const {tabLabel} = this.props;
    this.storeName = tabLabel;
  }
  componentDidMount() {
    this.loadData();
  }
  loadData(loadMore) {
    const {onRefreshPopular, onLoadMorePopular} = this.props;
    const store = this._store();
    const url = this.genFetchUrl(this.storeName);
    if (loadMore) {
      onLoadMorePopular(
        this.storeName,
        ++store.pageIndex,
        pageSize,
        store.items,
        callback => {
          this.refs.toast.show('没有更多了');
        },
      );
    } else {
      onRefreshPopular(this.storeName, url, pageSize);
    }
  }
    /**
   * 获取与当前页面有关的数据
   * @returns {*}
   * @private
   */
    _store() {
      const { popular } = this.props;
      let store = popular[this.storeName];
      if (!store) {
        store = {
          items: [],
          isLoading: false,
          projectModes: [],//要显示的数据
          hideLoadingMore: true,//默认隐藏加载更多
        }
      }
      return store;
    }
  genFetchUrl(key) {
    return URL + key + QUERY_STR;
  }
  renderItem(data) {
    const item = data.item;
    return <PopularItem item={item} onSelect={() => {}} />;
  }
  genIndicator() {
    return this._store().hideLoadingMore ? null :
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
        />
        <Text>正在加载更多</Text>
      </View>
  }
  render() {
    const {popular} = this.props;
    let store = popular[this.storeName]; //动态获取state
    if (!store) {
      store = {
        items: [],
        isLoading: false,
      };
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModes}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + item.id}
          refreshControl={
            <RefreshControl
              title={'loading'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={THEME_COLOR}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            console.log('---onEndReached----');
            setTimeout(() => {
              if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                this.loadData(true);
                this.canLoadMore = false;
              }
            }, 100);
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
            console.log('---onMomentumScrollBegin-----')
          }}
        />
        <Toast ref={'toast'} position={'center'} />
      </View>
    );
  }
}
//将dispatch映射给onThemeChange，然后注入到组件的props中
const mapDispatchToProps = dispatch => ({
  onRefreshPopular: (storeName, url) =>
    dispatch(actions.onRefreshPopular(storeName, url)),
  onLoadMorePopular: (storeName, pageIndex, pageSize, items, callBack) =>
    dispatch(
      actions.onLoadMorePopular(
        storeName,
        pageIndex,
        pageSize,
        items,
        callBack,
      ),
    ),
});
const mapStateToProps = state => ({
  popular: state.popular,
});
//包装 component，注入 dispatch到PopularTab
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    minWidth: 50
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6

  },
  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
    color: 'red',
    margin: 10
  }

});
