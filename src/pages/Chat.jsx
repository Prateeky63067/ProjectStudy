import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/Chat/ChatContainer";
import Contacts from "../components/Chat/Contacts";
import Welcome from "../components/Chat/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const fun1 = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setLoading(true);
        const curUser = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        console.log("api dtaaaaa-->", curUser);
        setCurrentUser(curUser);
        setLoading(false);
      }
    };
    fun1();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  useEffect(() => {
    const fun2 = async () => {
      console.log("currentUser---->", currentUser);
      if (currentUser) {
        console.log("if ke anndar hu");
        if (!currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          console.log("data hai ye-->", data.data);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };

    fun2();
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      {
        <Container>
          <div className="container">
            <Contacts contacts={contacts} changeChat={handleChatChange} />
            {console.log("currentChat hai ye-->", currentChat)}
            {currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatContainer currentChat={currentChat} socket={socket} />
            )}
          </div>
        </Container>
      }
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

// export default function Chat() {
//   const navigate = useNavigate();
//   const socket = useRef();
//   const [contacts, setContacts] = useState([]);
//   const [currentChat, setCurrentChat] = useState(undefined);
//   const [currentUser, setCurrentUser] = useState(undefined);
//   const [loading, setLoading] = useState(true); // Add loading state

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const storedUser = localStorage.getItem(
//           process.env.REACT_APP_LOCALHOST_KEY
//         );
//         if (!storedUser) {
//           navigate("/login");
//         } else {
//           const user = JSON.parse(storedUser);
//           setCurrentUser(user);
//           setLoading(false); // Set loading to false after user is set
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchData();
//   }, [navigate]);

//   useEffect(() => {
//     if (currentUser) {
//       socket.current = io(host);
//       socket.current.emit("add-user", currentUser._id);
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         if (currentUser) {
//           if (!currentUser.isAvatarImageSet) {
//             const { data } = await axios.get(
//               `${allUsersRoute}/${currentUser._id}`
//             );
//             setContacts(data);
//           } else {
//             navigate("/setAvatar");
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching contacts:", error);
//       }
//     };

//     fetchContacts();
//   }, [currentUser, navigate]);

//   const handleChatChange = (chat) => {
//     setCurrentChat(chat);
//   };

//   return (
//     <>
//       {loading ? ( // Display loading indicator if loading is true
//         <div>Loading...</div>
//       ) : (
//         <Container>
//           <div className="container">
//             <Contacts contacts={contacts} changeChat={handleChatChange} />
//             {currentChat !== undefined ? (
//               <Welcome />
//             ) : (
//               <div></div>
//               // <ChatContainer currentChat={currentChat} socket={socket} />
//             )}
//           </div>
//         </Container>
//       )}
//     </>
//   );
// }

// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-color: #131324;
//   .container {
//     height: 85vh;
//     width: 85vw;
//     background-color: #00000076;
//     display: grid;
//     grid-template-columns: 25% 75%;
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       grid-template-columns: 35% 65%;
//     }
//   }
// `;
