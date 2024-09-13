import React, {useState} from 'react';
import {Linking, SafeAreaView, StyleSheet, View} from 'react-native';
import {ConfirmButton, Input, NavBar, Tips} from '../common/LoginComponent';
import Constants from '../expand/dao/Constants';
import LoginDao from '../expand/dao/LoginDao';
import NavigationUtil from '../navigator/NavigationUtil';
export default (props: any) => {
  const {navigation} = props;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [helpUrl, setHelpUrl] = useState(
    'https://doc.devio.org/api-help/docs/rn-api-help.html',
  );
  const [msg, setMsg] = useState('');
  const onLogin = () => {
    if (userName === '' || password === '') {
      setMsg('用户名或密码不能为空');
      return;
    }
    setHelpUrl('');
    setMsg('');
    LoginDao.getInstance()
      .login(userName, password)
      .then(res => {
        setMsg('登录成功');
        NavigationUtil.resetToHomPage({navigation});
      })
      .catch(e => {
        const {code, data: {helpUrl = ''} = {}, msg} = e;
        setMsg(msg);
        setHelpUrl(helpUrl);
      });
  };
  return (
    <SafeAreaView style={styles.root}>
      <NavBar
        title="登录"
        rightTitle="注册"
        onRightClick={() => {
          //   Linking.openURL(Constants.apiDoc);
          NavigationUtil.registration({navigation});
        }}
      />
      <View style={styles.line} />
      <View style={styles.content}>
        <Input
          label="用户名"
          placeholder="请输入用户名"
          shortLine={true}
          onChangeText={(text: string) => setUserName(text)}
        />
        <Input
          label="密码"
          placeholder="请输入密码"
          secure={true}
          onChangeText={(text: string) => setPassword(text)}
        />
        <ConfirmButton title="登录" onClick={onLogin} />
        <Tips msg={msg} helpUrl={helpUrl} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingTop: 20,
    backgroundColor: '#F1F5F6',
    flexGrow: 1,
  },
  line: {
    height: 0.5,
    backgroundColor: '#D0D4D4',
  },
});
