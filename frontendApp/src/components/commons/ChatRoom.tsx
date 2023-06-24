import React, {
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {View, Text, Pressable, SafeAreaView, FlatList} from 'react-native';
import {Feather} from 'react-native-feather';

import {styles} from '../../styles/chat';
import {Socket} from 'socket.io-client';
import messageServices from '../../services/message.services';
import Chat from './Chat';

interface ChatProps extends PropsWithChildren {
  socketIo: Socket;
}

const ChatRoom = ({socketIo}: ChatProps) => {
  const [chatList, setChatList] = useState([]);
  /*
  // Runs when the component mounts
  useLayoutEffect(() => {
    async function searchChatList() {
      const chatListObtained = await messageServices.chatList();
      setChatList(chatListObtained);
    }
    searchChatList();
  }, []);

  // Runs whenever there is new trigger from the backend
  useEffect(() => {
    socketIo.on('chatList', chatsList => {
      setChatList(chatsList);
    });
  }, [socketIo]);*/

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chatlistContainer}>
        {chatList.length > 0 ? (
          <FlatList
            data={chatList}
            renderItem={({item}) => <Chat item={item} />}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No chat inicied!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChatRoom;
