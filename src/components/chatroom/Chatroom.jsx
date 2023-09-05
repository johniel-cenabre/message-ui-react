import {Button, Card, Form, Input, Row, Space, Typography} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import styles from './Chatroom.module.css';
import {SEND_MESSAGE, UPDATE_CHAT, chatStore} from '../../store/chatStore';

function Chatroom({username}) {

  const [chatState, setChatState] = useState(chatStore.getState());

  useEffect(() => {
    const storageListener = (e) => {
      if (e.key === 'message-ui-react') {
        chatStore.dispatch({type: UPDATE_CHAT, state: JSON.parse(e.newValue)});
        setChatState(chatStore.getState());
      }
    };

    window.addEventListener('storage', storageListener);

    return () => window.removeEventListener('storage', storageListener);
  }, []);

  const formRef = useRef();
  const inputRef = useRef();
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current.scrollIntoView();
  });

  const onReset = async () => {
    formRef.current.resetFields();
  };

  const onSend = async ({message}) => {
    if (message === "") {
      return;
    }

    chatStore.dispatch({
      type: SEND_MESSAGE,
      username,
      message
    });

    await onReset();
    inputRef.current.focus();
  };

  return (
    <Form className={styles.chatroom} ref={formRef} onFinish={onSend}>
      {chatState?.map((chat, index) => {

        const isSystemMessage = !chat.username;

        if (isSystemMessage) {
          return <Row key={(chat.message + '' + index)} className={styles.chatrow} justify="start">
            <Typography.Text className={styles.system}>{chat.message}</Typography.Text>
          </Row>;
        }

        const isCurrentUserMessage = chat.username === username;

        return (
          <Row key={(chat.message + '' + index)} className={styles.chatrow} justify={isCurrentUserMessage ? 'end' : 'start'}>
            <Card className={`${styles.messagebox}${isCurrentUserMessage ? ` ${styles.you}` : ''}`}>
              <Row>
                <Typography.Text className={styles.user}>{isCurrentUserMessage ? 'You' : chat.username}</Typography.Text>
              </Row>
              <Row>
                <Typography.Text className={styles.message}>{chat.message}</Typography.Text>
              </Row>
            </Card>
          </Row>
        );
      })}
      <Row ref={bottomRef} />
      <Row className={styles.textboxRow}>
        <Form.Item className={styles.textboxContainer} name="message">
          <Space.Compact className={styles.textbox} size="large">
            <Input
              autoFocus
              ref={inputRef}
              size="large"
              placeholder="Enter your message here"
            />
            <Button className={styles.send} type="primary" htmlType="submit">Send</Button>
          </Space.Compact>
        </Form.Item>
      </Row>
    </Form>
  );
}

export default Chatroom;