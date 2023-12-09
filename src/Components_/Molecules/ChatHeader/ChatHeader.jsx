import './ChatHeader.css';
import Icon from '../../Atoms/Icon/Icon';
import CurrentUser from '../CurrentUser/CurrentUser';
import {useNavigate} from "react-router-dom"

const ChatHeader = () => {

  const navigate = useNavigate()

  const handleLeaveChat = () => {
    localStorage.removeItem("userName")
    navigate("/")
    window.location.reload()
  }

  return (
    <div className="chat-header">
      {/* Modifier avec le bon User Component */}
      <CurrentUser username="Un prénom" isConnected="true"/>
      <button onClick={handleLeaveChat}>
        <Icon value="LogoutIcon" size={35}/>
      </button>
    </div>
  );
};

export default ChatHeader;