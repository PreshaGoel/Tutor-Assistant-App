import React from 'react';
import {Dialog, Button, Paragraph, Divider} from 'react-native-paper';

const DialogComponent = ({
  visible,
  setVisible,
  Content,
  onPress = () => setVisible(false),
}) => {
  return (
    <Dialog visible={visible} onDismiss={() => setVisible(false)}>
      <Dialog.Title>Information</Dialog.Title>
      <Divider />
      <Dialog.Content>
        <Paragraph>{Content}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onPress}>OKAY</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DialogComponent;
