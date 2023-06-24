import React from 'react';
import {View, Text} from 'react-native';

function Message({message}) {
  return (
    <View>
      <Text>
        {message.emitter}: {message.message}
      </Text>
    </View>
  );
}

export default Message;
