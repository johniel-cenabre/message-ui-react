import {Button, Card, Form, Input, Row, Space, Typography} from 'antd';
import React, {useEffect, useRef} from 'react';
import styles from './Chatroom.module.css';

function Chatroom({username}) {

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

    await onReset();
    inputRef.current.focus();
  };

  return (
    <Form className={styles.chatroom} ref={formRef} onFinish={onSend}>
      <Row className={styles.chatrow} justify="start">
        <Card className={styles.messagebox}>
          <Row>
            <Typography.Text className={styles.user}>User 4</Typography.Text>
          </Row>
          <Row>
            <Typography.Text className={styles.message}>hi</Typography.Text>
          </Row>
        </Card>
      </Row>
      <Row className={styles.chatrow} justify="start">
        <Card className={styles.messagebox}>
          <Row>
            <Typography.Text className={styles.user}>User 3</Typography.Text>
          </Row>
          <Row>
            <Typography.Text className={styles.message}>hi</Typography.Text>
          </Row>
        </Card>
      </Row>
      <Row className={styles.chatrow} justify="start">
        <Card className={styles.messagebox}>
          <Row>
            <Typography.Text className={styles.user}>User 2</Typography.Text>
          </Row>
          <Row>
            <Typography.Text className={styles.message}>hi</Typography.Text>
          </Row>
        </Card>
      </Row>
      <Row className={styles.chatrow} justify="start">
        <Card className={styles.messagebox}>
          <Row>
            <Typography.Text className={styles.user}>User 1</Typography.Text>
          </Row>
          <Row>
            <Typography.Text className={styles.message}>hi</Typography.Text>
          </Row>
        </Card>
      </Row>
      <Row className={styles.chatrow} justify="end">
        <Card className={`${styles.messagebox} ${styles.you}`} bordered>
          <Row>
            <Typography.Text className={styles.user}>You</Typography.Text>
          </Row>
          <Row>
            <Typography.Text className={styles.message}>hello</Typography.Text>
          </Row>
        </Card>
      </Row>
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