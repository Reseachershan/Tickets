import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const CustomButton = ({ text, onPress, loading }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
    {loading ? (
      <ActivityIndicator style={{paddingHorizontal: 24}} size="small" color="#ffffff" />
    ) : (
      <Text style={styles.buttonText}>{text}</Text>
    )}
  </TouchableOpacity>
  );
};

export const Buttom = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnBorder}>
      <Text style={{ color: '#1935D1', textTransform: 'uppercase', fontSize: 16, fontFamily: 'OpenSans-Bold', }}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    shadowColor: '#1935D1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    borderRadius: 10,
    backgroundColor: '#1935D1',
    paddingVertical: 10,
    paddingHorizontal: 24,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 4,
    marginBottom: 100
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontFamily: 'OpenSans-Bold'
  },
  btnBorder: {
    width: 164,
    height: 56,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: '#1935D1',
    flex: 0,
    flexGrow: 0,
    order: 0,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#1935D1',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30
  },
});

export default CustomButton;
