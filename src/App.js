import './App.css';
import {useState} from 'react';
import Welcome from './components/welcome/Welcome';
import Chatroom from './components/chatroom/Chatroom';

function App() {
  const [username, setUsername] = useState();

  if (!username) {
    return (
      <Welcome username={username} setUsername={setUsername} />
    );
  }

  return (
    <Chatroom username={username} />
  );
}

export default App;
