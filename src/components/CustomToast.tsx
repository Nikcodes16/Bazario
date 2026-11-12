import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CheckCircle} from 'lucide-react-native';

type Props = {
  text1?: string;
  text2?: string;
};

const CustomToast = ({text1, text2}: Props) => {
  return (
    <View style={styles.container}>
      <CheckCircle size={24} color="#7DA2E4" />

      <View style={styles.content}>
        <Text style={styles.title}>
          {text1}
        </Text>

        {text2 && (
          <Text style={styles.message}>
            {text2}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 60,
    backgroundColor: '#ffffff',
    borderWidth:1,
    borderColor:'#7DA2E4',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',

    // Shadow
    elevation: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  content: {
    marginLeft: 12,
    flex: 1,
  },

  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },

  message: {
    marginTop: 3,
    fontSize: 11,
    color: '#6B7280',
  },
});

export default CustomToast;