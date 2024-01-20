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
    const [page, setPage] = useState(1)


    useEffect(() => {
        apiHit()
    }, [])





    console.log("item?._iditem?._iditem?._id",item?._id)
    useEffect(()=>{

            socketServices.emit("join_room", item?._id)

            socketServices.on('send_message', (data)=>{
                console.log("send_message",data)
               
                setMessages(previousMessages =>
                    GiftedChat.append(previousMessages, data),
                  )
             
            })
            return () =>{
                socketServices.removeListener('send_message')
            }
    },[])

    


    const apiHit = async () => {
        try {
            const res = await actions.myMessages(`?chatId=${item?._id}&limit=${limit}&page=${page}`)
            console.log("myMessages res++++", res)
            setMessages(res.data)

        } catch (error) {
            console.log("error raised", error)
        }
    }



    const onSend = useCallback((messages = []) => {

        actions.sendMessage({
            chatId: item?._id,
            text: messages[0]?.text
        }).then((res) => {
            console.log("success...!!", res)

            socketServices.emit('send_message', {
                ...res.data,
                chatId: item?._id,
                userId: item.users[0]?._id,
                user: {
                    _id: userData?._id,
                    userName: userData?.userName
                }
            })

        }).catch((error) => {
            console.log("message not send")
        })
    }, [])

    return (
        <WrapperContainer>
            <View style={{ flex: 1 }}>
                <HeaderComp

                    leftText={item?._id}
                    style={{ marginBottom: moderateScaleVertical(16) }}
                />
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: userData._id,
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
