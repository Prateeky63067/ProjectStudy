// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import Logo from "../../assets/logo.svg";
// import { useSelector } from "react-redux";
// import { fetchCourseDetails } from "../../services/operations/courseDetailsAPI";

// export default function Contacts({ contacts, changeChat }) {
//   const [currentUserName, setCurrentUserName] = useState(undefined);
//   const [currentUserLastName, setCurrentUserLastName] = useState(undefined);
//   const [currentUserImage, setCurrentUserImage] = useState(undefined);
//   const [currentSelected, setCurrentSelected] = useState(undefined);
//   const [contactAsStudent, setContactAsStudent] = useState([]);
//   const [contactAsInstructor, setContactAsInstructor] = useState("");

//   const { user } = useSelector((state) => state.profile);

//   {
//     console.log("user hai ye---->", user);
//   }
//   const coursedetails = async (courseId) => {
//     try {
//       const res = await fetchCourseDetails(courseId);

//       setContactAsStudent([
//         ...contactAsStudent,
//         res.data.courseDetails.instructor,
//       ]);
//       console.log("course details res: ", res.data.courseDetails.instructor);
//     } catch (error) {
//       console.log("Could not fetch Course Details");
//     }
//   };

//   if (user?.accountType === "Student") {
//     console.log(user.courses.length);
//     for (let i = 0; i < user.courses.length; i++) {
//       const res = coursedetails(user.courses[i]);
//       console.log("res----->----->", res);
//     }
//   } else if (user?.accountType === "Studen") {
//     console.log("bye");
//   }
//   useEffect(() => {
//     const fun1 = async () => {
//       const data = await JSON.parse(
//         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//       );

//       setCurrentUserName(data.firstName);
//       setCurrentUserLastName(data.lastName);
//       // setCurrentUserImage(user.image);
//     };
//     fun1();
//   }, []);
//   const changeCurrentChat = (index, contact) => {
//     setCurrentSelected(index);
//     changeChat(contact);
//   };
//   return (
//     <>
//       {currentUserName && (
//         <Container>
//           <div className="brand">
//             <img src={Logo} alt="logo" />
//             <h3>snappy</h3>
//           </div>
//           <div className="contacts">
//             {console.log("contact--->", contacts)}
//             {contacts.map((contact, index) => {
//               return (
//                 <div
//                   key={contact._id}
//                   className={`contact ${
//                     index === currentSelected ? "selected" : ""
//                   }`}
//                   onClick={() => changeCurrentChat(index, contact)}
//                 >
//                   <div className="avatar">
//                     <img
//                       className="rounded-full"
//                       src={`https://api.dicebear.com/5.x/initials/svg?seed=${contact.firstName} ${contact.lastName}`}
//                       alt=""
//                     />
//                   </div>
//                   <div className="username">
//                     <h3>{contact.firstName}</h3>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="current-user">
//             <div className="avatar">
//               <img
//                 className="rounded-full"
//                 src={`https://api.dicebear.com/5.x/initials/svg?seed=${currentUserName} ${currentUserLastName}`}
//                 alt=""
//               />
//             </div>
//             <div className="username">
//               <h2>{currentUserName}</h2>
//             </div>
//           </div>
//         </Container>
//       )}
//     </>
//   );
// }
// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 75% 15%;
//   overflow: hidden;
//   background-color: #080420;
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 2rem;
//     }
//     h3 {
//       color: white;
//       text-transform: uppercase;
//     }
//   }
//   .contacts {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     overflow: auto;
//     gap: 0.8rem;
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         background-color: #ffffff39;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .contact {
//       background-color: #ffffff34;
//       min-height: 5rem;
//       cursor: pointer;
//       width: 90%;
//       border-radius: 0.2rem;
//       padding: 0.4rem;
//       display: flex;
//       gap: 1rem;
//       align-items: center;
//       transition: 0.5s ease-in-out;
//       .avatar {
//         img {
//           height: 3rem;
//         }
//       }
//       .username {
//         h3 {
//           color: white;
//         }
//       }
//     }
//     .selected {
//       background-color: #9a86f3;
//     }
//   }

//   .current-user {
//     background-color: #0d0d30;
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
//     gap: 2rem;
//     .avatar {
//       img {
//         height: 4rem;
//         max-inline-size: 100%;
//       }
//     }
//     .username {
//       h2 {
//         color: white;
//       }
//     }
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       gap: 0.5rem;
//       .username {
//         h2 {
//           font-size: 1rem;
//         }
//       }
//     }
//   }
// `;

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import Logo from "../../assets/logo.svg";
// import { useSelector } from "react-redux";
// import { fetchCourseDetails } from "../../services/operations/courseDetailsAPI";
// import { fetchUserData } from "../../services/operations/profileAPI";

// export default function Contacts({ contacts, changeChat }) {
//   const [currentUserName, setCurrentUserName] = useState(undefined);
//   const [currentUserLastName, setCurrentUserLastName] = useState(undefined);
//   const [currentUserImage, setCurrentUserImage] = useState(undefined);
//   const [currentSelected, setCurrentSelected] = useState(undefined);
//   const [contactAsStudent, setContactAsStudent] = useState([]);
//   const [contactAsInstructor, setContactAsInstructor] = useState("");

//   const { user } = useSelector((state) => state.profile);
//   console.log("User-->", user);
//   useEffect(() => {
//     const fetchCourseDetailsForUser = async () => {
//       try {
//         if (user?.accountType === "Student") {
//           const courseDetailPromises = user.courses.map(async (courseId) => {
//             try {
//               const res = await fetchCourseDetails(courseId);
//               return res.data.courseDetails.instructor;
//             } catch (error) {
//               console.log("Error fetching course details:", error);
//               return null;
//             }
//           });
//           const courseDetails = await Promise.all(courseDetailPromises);
//           setContactAsStudent(courseDetails.filter(Boolean)); // Filter out any null values
//         } else if (user?.accountType === "Instructor") {
//           const courseDetailPromises = user.courses.map(async (courseId) => {
//             try {
//               const res = await fetchCourseDetails(courseId);
//               const studentsEnrolled = res.data.courseDetails.studentsEnroled;
//               const studentDetailsPromises = studentsEnrolled.map(
//                 async (studentId) => {
//                   try {
//                     console.log("studentId-->",studentId)
//                     const studentRes = await fetchUserData(studentId); // Fetch user data for each student ID
//                     console.log("studentRes-->",studentRes)
//                     return studentRes; // Assuming this is how you get user data
//                   } catch (error) {
//                     console.log("Error fetching student details:", error);
//                     return null;
//                   }
//                 }
//               );
//               const studentDetails = await Promise.all(studentDetailsPromises);
//               console.log("studentDetails---------------->",studentDetails)

              
//               return studentDetails.existingUser;
//             } catch (error) {
//               console.log("Error fetching course details:", error);
//               return null;
//             }
//           });
//           const courseDetails = await Promise.all(courseDetailPromises);
//           // Flatten the array of arrays into a single array of student details
//           const flattenedDetails = courseDetails.filter(Boolean);
//           setContactAsStudent(flattenedDetails);
//           console.log("contactAsStudent--->>",contactAsStudent)
//         }
//       } catch (error) {
//         console.log("Error fetching course details for user:", error);
//       }
//     };

//     fetchCourseDetailsForUser();
//   }, [user]);

//   useEffect(() => {
//     const fun1 = async () => {
//       const data = await JSON.parse(
//         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//       );

//       setCurrentUserName(data.firstName);
//       setCurrentUserLastName(data.lastName);
//       // setCurrentUserImage(user.image);
//     };
//     fun1();
//   }, []);

//   const changeCurrentChat = (index, contact) => {
//     setCurrentSelected(index);
//     changeChat(contact);
//   };

//   const uniqueData = {};
//   const uniqueEntries = [];

//   contactAsStudent.forEach((entry) => {
//     if (!uniqueData[entry.email]) {
//       uniqueData[entry.email] = true;
//       uniqueEntries.push(entry);
//     }
//   });

//   console.log("uniqueEntries--->", uniqueEntries);

//   return (
//     <>
//       {currentUserName && (
//         <Container>
//           <div className="brand">
//             <img src={Logo} alt="logo" />
//             <h3>snappy</h3>
//           </div>
//           <div className="contacts">
//             {uniqueEntries.map((contact, index) => {
//               return (
//                 <div
//                   key={contact._id}
//                   className={`contact ${
//                     index === currentSelected ? "selected" : ""
//                   }`}
//                   onClick={() => changeCurrentChat(index, contact)}
//                 >
//                   <div className="avatar">
//                     <img
//                       className="rounded-full"
//                       src={`https://api.dicebear.com/5.x/initials/svg?seed=${contact.firstName} ${contact.lastName}`}
//                       alt=""
//                     />
//                   </div>
//                   <div className="username">
//                     <h3>{contact.firstName}</h3>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="current-user">
//             <div className="avatar">
//               <img
//                 className="rounded-full"
//                 src={`https://api.dicebear.com/5.x/initials/svg?seed=${currentUserName} ${currentUserLastName}`}
//                 alt=""
//               />
//             </div>
//             <div className="username">
//               <h2>{currentUserName}</h2>
//             </div>
//           </div>
//         </Container>
//       )}
//     </>
//   );
// }

// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 75% 15%;
//   overflow: hidden;
//   background-color: #080420;
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 2rem;
//     }
//     h3 {
//       color: white;
//       text-transform: uppercase;
//     }
//   }
//   .contacts {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     overflow: auto;
//     gap: 0.8rem;
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         background-color: #ffffff39;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .contact {
//       background-color: #ffffff34;
//       min-height: 5rem;
//       cursor: pointer;
//       width: 90%;
//       border-radius: 0.2rem;
//       padding: 0.4rem;
//       display: flex;
//       gap: 1rem;
//       align-items: center;
//       transition: 0.5s ease-in-out;
//       .avatar {
//         img {
//           height: 3rem;
//         }
//       }
//       .username {
//         h3 {
//           color: white;
//         }
//       }
//     }
//     .selected {
//       background-color: #9a86f3;
//     }
//   }

//   .current-user {
//     background-color: #0d0d30;
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
//     gap: 2rem;
//     .avatar {
//       img {
//         height: 4rem;
//         max-inline-size: 100%;
//       }
//     }
//     .username {
//       h2 {
//         color: white;
//       }
//     }
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       gap: 0.5rem;
//       .username {
//         h2 {
//           font-size: 1rem;
//         }
//       }
//     }
//   }
// `;












import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../../assets/logo.svg";
import { useSelector } from "react-redux";
import { fetchCourseDetails } from "../../services/operations/courseDetailsAPI";
import { fetchUserData } from "../../services/operations/profileAPI";
import { useMediaQuery } from "@react-hook/media-query";

export default function Contacts({ contacts, changeChat,setMobile,mobile }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [currentUser, setCurrentUser] = useState({});
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [contactAsStudent, setContactAsStudent] = useState([]);
  const [contactInstructor, setContactInstructor] = useState([]);
  const[chatView,setChatview]=useState(false);
  const [widthClass, setWidthClass] = useState(mobile?"w-[90vw]":"w-[17.055vw]");
 

  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const fetchUserDataAndCourseDetails = async () => {
      try {
        if (!user) return;

        const fetchDetails = async (id) => {
          try {
            const res = await fetchCourseDetails(id);
            return res.data.courseDetails;
          } catch (error) {
            console.log("Error fetching course details:", error);
            return null;
          }
        };

        if (user.accountType === "Student") {
          const courseDetailsPromises = user.courses.map(fetchDetails);
          const courseDetails = await Promise.all(courseDetailsPromises);
          const instructors = courseDetails.map((detail) => detail.instructor);
          setContactAsStudent(instructors.filter(Boolean));
        } else if (user.accountType === "Instructor") {
          const studentsPromises = user.courses.map(async (courseId) => {
            try {
              const courseDetails = await fetchDetails(courseId);
              const studentDetailsPromises = courseDetails.studentsEnroled.map(
                async (studentId) => {
                  try {
                    const studentRes = await fetchUserData(studentId);
                    return studentRes.data; // Assuming this is how you get user data
                  } catch (error) {
                    console.log("Error fetching student details:", error);
                    return null;
                  }
                }
              );
              return await Promise.all(studentDetailsPromises);
            } catch (error) {
              console.log("Error fetching course details:", error);
              return null;
            }
          });
          const studentDetails = await Promise.all(studentsPromises);
          const flattenedDetails = studentDetails.flat().filter(Boolean);
          setContactInstructor(flattenedDetails);
          console.log("contactInstructor---->",contactInstructor)
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchUserDataAndCourseDetails();
  }, [user]);



const uniqueData = {};
const uniqueEntries = [];

contactAsStudent.forEach((entry) => {
  if (!uniqueData[entry.email]) {
    uniqueData[entry.email] = true;
    uniqueEntries.push(entry);
  }
});


const uniqueDataIns = {};
const uniqueEntriesIns = [];

contactInstructor.forEach((entry) => {
  if (!uniqueDataIns[entry.existingUser.email]) {
    uniqueDataIns[entry.existingUser.email] = true;
    uniqueEntriesIns.push(entry.existingUser);
  }
  // console.log("entry",entry.existingUser.email)
});

console.log("first-7777777777777",uniqueEntriesIns)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    setCurrentUser(userData);
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    isMobile&&setMobile(!mobile);
    mobile&&setWidthClass("w-[0vw]")
  };
  let arrayData=[];
  if(user?.accountType === "Instructor")
  {
    arrayData=[...uniqueEntriesIns];
  }else if(user?.accountType === "Student")
  {
    arrayData=[...uniqueEntries];
  }
  console.log("arrayData-->",arrayData)

  return (
    <Container className={widthClass}>
      {currentUser && (
        <>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Pedagox</h3>
          </div>
          <div className="contacts">
            {arrayData.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${index === currentSelected ? "selected" : ""}`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    className="rounded-full"
                    src={`https://api.dicebear.com/5.x/initials/svg?seed=${contact.firstName} ${contact.lastName}`}
                    alt=""
                  />
                </div>
                <div className="username">
                  <h3>{contact.firstName}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                className="rounded-full"
                src={`https://api.dicebear.com/5.x/initials/svg?seed=${currentUser.firstName} ${currentUser.lastName}`}
                alt=""
              />
            </div>
            <div className="username">
              <h2>{currentUser.firstName}</h2>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #161D29;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #ffffff34;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
