import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'userToken';
const USERNAME_KEY = 'userName';

// Function to check if token exists
async function isTokenExist() {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return !!token; // Converts token value to boolean (true if token exists, false otherwise)
}

// Function to get the existing token
async function getTokenExist() {
  return await AsyncStorage.getItem(TOKEN_KEY);
}

// Function to get the user name
async function getUserName() {
  return await AsyncStorage.getItem(USERNAME_KEY);
}

// Function to save token and username
async function saveAuthData(token, username) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
  await AsyncStorage.setItem(USERNAME_KEY, username);
}

// Function to clear auth data
async function clearAuthData() {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(USERNAME_KEY);
}

const AuthService = {
  isTokenExist,
  getTokenExist,
  getUserName,
  saveAuthData,
  clearAuthData,
};

export default AuthService;
