/* import {Socket} from 'socket.io-client';
import React, {
  useState,
  useEffect,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {AuthContext} from '../../context/auth.context';
import Message from './message';
import chatServices from '../../services/message.services';

interface ChatProps extends PropsWithChildren {
  socketIo: Socket;
  route: {
    params: {
      data: Owner;
    };
  };
}

type Owner = {
  id: string;
  name: string;
};

const Chat = ({route, socketIo, navigation}: ChatProps) => {
  const {user} = useContext(AuthContext);
  const owner: Owner = route.params.data;

  const [messages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({title: owner.name});
    socketIo.emit('findRoom', owner.id);
    socketIo.on('foundRoom', roomChat => setChatMessages(roomChat));
  }, [navigation, owner.id, owner.name, socketIo]);

  useEffect(() => {
    socketIo.on('foundRoom', roomChats => setChatMessages(roomChats));
  }, [socketIo]);

  async function handleSendMessage() {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    socketIo.emit('newMessage', {
      message,
      room_id: owner.id,
      user,
      timestamp: {hour, mins},
    });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({item}) => <Message message={item} />}
        keyExtractor={item => new Date(item.dataTime).toISOString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={messageInput}
          onChangeText={setMessageInput}
          placeholder="Type a message"
          placeholderTextColor="#ccc"
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
 */
