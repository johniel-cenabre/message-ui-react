import {Button, Form, Input, Space, Typography} from 'antd';
import React from 'react';
import styles from './Welcome.module.css';
import {JOIN_CHAT, getChatStore} from '../../store/chatStore';

function Welcome({setUsername}) {

  const onSubmit = ({username}) => {
    setUsername(username);

    const chatStore = getChatStore();
    chatStore.dispatch({
      type: JOIN_CHAT,
      username
    });
  };

  return (
    <Form
      className={styles.welcome}
      onFinish={onSubmit}>
      <Typography.Text className={styles.title} strong>Welcome!</Typography.Text>
      <Form.Item
        name="username"
        rules={[{required: true, message: 'Please enter your name.'}]}>
        <Space.Compact size="large">
          <Input
            autoFocus
            size="large"
            placeholder="Enter your name here"
          />
          <Button type="primary" htmlType="submit">Submit</Button>
        </Space.Compact>
      </Form.Item>
    </Form>
  );
}

export default Welcome;