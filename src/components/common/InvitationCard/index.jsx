// /* eslint-disable react/prop-types */
// import { getInvitations, acceptInvitation } from "../../../api/FirestoreAPI";
// import { useState, useEffect } from "react";

// export default function InvitationCard({ users, currentUser }) {
//   const [invitations, setInvitations] = useState(false);

//   useEffect(() => {
//     getInvitations( currentUser.id,users.id, setInvitations);
//   }, [currentUser.id, users.id]);

//   return (
//     invitations && (
//       <>
//         <li className="invitation-card">
//           <div className="invitation-card-content">
//             <img
//               src={users.imageLink}
//               alt=""
//               className="invitation-card-image"
//             />
//             <div className="invitation-card-info">
//               <span className="invitation-card-title">{users?.name}</span>
//               <span className="invitation-card-subtitle">
//                 {users?.headline}
//               </span>
//             </div>
//           </div>
//           <div className="invitation-card-buttons">
//             <button
//               className="invitation-card-ignore-btn"
//               onClick={() => {
//                 acceptInvitation(users.id, currentUser.id, false);
//               }}
//             >
//               Ignore
//             </button>
//             <button
//               className="invitation-card-accept-btn"
//               onClick={() => {
//                 acceptInvitation(users.id, currentUser.id, true);
//               }}
//             >
//               Accept
//             </button>
//           </div>
//         </li>
//         <div className="invitation-card__horizontal-line"></div>
//       </>
//     )
//   );
// }
