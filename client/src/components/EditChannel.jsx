import React, {useState} from "react";
import { useChatContext } from "stream-chat-react";
import { UserList } from './'
import { CloseCreateChannel } from "../assets";

const ChannelNameInput = ({ channelName = '', setChannelName})=>{
    const {client, setActiveChannel} = useChatContext() //for selecting multiple users
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
    const handleChange = (event)=>{
        event.preventDefault()
        setChannelName(event.target.value)

    }
    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder='enter channel-name'/>
            <p>Add Members</p>
        </div>
    )



}

const EditChannel=({setIsEditing})=>{
    const {channel} = useChatContext()
    const [channelName, setChannelName] = useState(channel?.data?.name) //if channel name exists, use that
    const [selectedUsers,setSelectedUsers]= useState([])
    const updateChannel = async (event)=>{
        event.preventDefault()
        const nameChanged = channelName !== (channel.data.name || channel.data.id) //name has been changed
        if (nameChanged){
            await channel.update ({name: channelName}, {text: `Channel name changed to ${channelName}`})
        }
        if(selectedUsers.length){//length has changed, new users added
            await channel.addMembers(selectedUsers)
        }
        setChannelName(null)
        setIsEditing(false)
        setSelectedUsers([])
    }
    return(
        <div className="edit-channel__container">
            <div className="edit-channel__header">
                <p>Edit</p>
                <CloseCreateChannel setIsEditing={setIsEditing}/>

            </div>
            <ChannelNameInput  channelName={channelName} setChannelName={setChannelName}/>
            <UserList setSelectedUsers={setSelectedUsers}/>
            <div className="edit-channel__button-wrapper" onClick={updateChannel}>
                <p>Save</p>
            </div>
        </div>

    )
}

export default EditChannel;