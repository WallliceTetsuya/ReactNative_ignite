import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setObject = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    alert(error);
  }
};

export const getObject = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) { 
    alert(error);
  }
};

export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    alert(error);
  }
}

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    alert(error);
  }
}

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    alert(error);
  }
}

export const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    alert(error);
  }
}

export const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    alert(error);
  }
}

export const getMultipleData = async (keys) => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    return values;
  } catch (error) {
    alert(error);
  }
}

export const setMultipleData = async (data) => {
  try {
    await AsyncStorage.multiSet(data);
  } catch (error) {
    alert(error);
  }
}
