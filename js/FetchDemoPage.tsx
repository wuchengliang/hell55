import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Constants from './expand/dao/Constants';
import { get, post } from './expand/dao/HiNet';
export default (props: any) => {
    const [msg, setMsg] = useState('');
    const doFetch = () => {
        // fetch('https://api.devio.org/uapi/test/test?requestPrams=RN')
        //     .then(res => res.json())
        //     .then(result => {
        //         setMsg(JSON.stringify(result));
        //     }).catch(e => {
        //         console.log(e);
        //         setMsg(JSON.stringify(e));
        //     })
        // get(Constants.test.api)({ requestPrams: 'RN' }).then(result => {
        //     setMsg(JSON.stringify(result));
        // }).catch(e => {
        //     console.log(e);
        //     setMsg(JSON.stringify(e));
        // })
        const formData = new FormData();
        formData.append("requestPrams", 'RN');
        post(Constants.test.api)(formData)().then(result => {
            setMsg(JSON.stringify(result));
        }).catch(e => {
            console.log(e);
            setMsg(JSON.stringify(e));
        })
    }
    return (
        <SafeAreaView style={styles.root}>
            <TouchableOpacity onPress={doFetch}>
                <Text>加载</Text>
            </TouchableOpacity>
            <Text>{msg}</Text>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});