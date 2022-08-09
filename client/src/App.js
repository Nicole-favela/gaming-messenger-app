import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import 'stream-chat-react/dist/css/index.css'
import {StreamChat} from 'stream-chat';
import Cookies from 'universal-cookie';
import { Chat } from 'stream-chat-react'
import { ChannelContainer,ChannelListContainer, Auth} from './components';
import Footer from './components/Footer'

// import ChannelContainer from './components/ChannelContainer';
// import ChanellListContainer from './components/ChanellListContainer';
const cookies = new Cookies();



const apiKey = 'sfrqp8v635jz'
const client = StreamChat.getInstance(apiKey)
const authToken = cookies.get("token");//available only after the user logs in
if (authToken){ //connects user
  client.connectUser({
    id:cookies.get('userId'),
    name: cookies.get('username'),
    fullName:cookies.get('fullName'),
    image:cookies.get('avatarURL'),
    hashedPassword:cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber')

  },authToken)
}

function App() {
  const [createType, setCreateType] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  if (!authToken) return <Auth/> //render auth if not logged in
  return (
    <>
    <div className="app__wrapper">
      <Chat client = {client} theme = "team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        
        />
      </Chat>
     
      
    
    </div>
    
    
     </>
  );
}

export default App;
