//import liraries
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WrapperContainer from '../../Components/WrapperContainer';
import HeaderComp from '../../Components/HeaderComp';
import { moderateScaleVertical } from '../../styles/responsiveSize';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import actions from '../../redux/actions';
import socketServices from '../../utils/sockertService';

// create a component
const limit = 50
const Messages = ({ navigation, route }) => {
    const item = route.params.item

    const { userData } = useSelector(state => state?.auth)

    const [messages, setMessages] = useState([])
    const [isUserOnline, setIsUserOnline] = useState(false);

    const [page, setPage] = useState(1)

    const [isTyping, setIsTyping] = useState(false)

    const roomId = item?._id
    const roomName = item?.name
    const receiverIds = item.users[0]?._id
    console.log("item+++", item)

    useEffect(() => {
        apiHit()
        socketServices.emit('app_open',{userId: userData?._id})
    }, [])

    const leaveRoom = () => {
        socketServices.emit('leave_room', roomId)
        navigation.goBack()
    }

    useEffect(() => {

        socketServices.emit("join_room", roomId)

        socketServices.on('send_message', (data) => {
            console.log("send_message", data)

            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, data),
            )

        })
        return () => {
            socketServices.removeListener('send_message')
            socketServices.emit('leave_room', roomId)
        }
    }, [])


    useEffect(() => {

        socketServices.on('user_typing', ({ userId }) => {
            setIsTyping(userData._id !== userId)
        })

        socketServices.on('user_stopped', ({ userId }) => {
            setIsTyping(false)
        })

        // Listen for the user_online event from the server
        socketServices.on('user_online', ({ userId, isOnline, activeUsers }) => {
            console.log("activeUsersactiveUsers",activeUsers)
            alert(`is ${userId} online ? : ${isOnline}`)
            if (userId === receiverIds) {
                setIsUserOnline(isOnline);
            }
        });

        return () => {
            socketServices.removeListener('user_typing')
            socketServices.removeListener('user_stopped')
            socketServices.removeListener('user_online')
        }

    }, [userData?._id, isTyping])



    const apiHit = async () => {
        try {
            const res = await actions.myMessages(`?chatId=${roomId}&limit=${limit}&page=${page}`)
            console.log("myMessages res++++", res)
            setMessages(res.data)

        } catch (error) {
            console.log("error raised", error)
        }
    }



    const onSend = useCallback((messages = []) => {
        stopTyping()
        actions.sendMessage({
            chatId: roomId,
            text: messages[0]?.text,
            receiverId: receiverIds
        }).then((res) => {
            console.log("success...!!", res)

            socketServices.emit('send_message', {
                ...res.data,
                chatId: roomId,
                userId: receiverIds,
                roomData: res.roomData,
                user: {
                    _id: userData?._id,
                    userName: userData?.userName
                }
            })

        }).catch((error) => {
            console.log("message not send")
        })
    }, [])


    const startTyping = () => {
        socketServices.emit('is_typing', { roomId, userId: userData._id })
    }
    const stopTyping = () => {
        socketServices.emit('stop_typing', { roomId, userId: userData._id })
    }


    function debounce(func, delay = 500) {

        let timeoutId;
        return function (...args) {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(() => {
                func.apply(this, args)
            }, delay);
        }
    }


    const handleTextInput = debounce(() => {
        stopTyping()
    }, 6000)


    return (
        <WrapperContainer>
            <View style={{ flex: 1 }}>
                <HeaderComp

                    leftText={roomName}
                    style={{ marginBottom: moderateScaleVertical(16) }}
                    onPressLeft={leaveRoom}
                />
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: userData._id,
                    }}
                    isTyping={isTyping}
                    onInputTextChanged={text => {
                        if (text.length > 0 && !isTyping) {
                            startTyping()
                            handleTextInput()
                        }
                    }}

                />
            </View>
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Messages;
