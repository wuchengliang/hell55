import AsyncStorage from "@react-native-async-storage/async-storage";
const KEY_BOADRDING_PASS = "boarding-pass"
/**
 * 保存登录态
 * @param data 
 */
export function saveBoarding(data: string) {
    AsyncStorage.setItem(KEY_BOADRDING_PASS, data);
}
/**
 * 获取登录态
 * @returns 
 */
export async function getBoarding() {
    return await AsyncStorage.getItem(KEY_BOADRDING_PASS);
}