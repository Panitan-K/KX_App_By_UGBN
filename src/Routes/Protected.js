import  { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from './Firebase'; // Ensure you have this Firebase configuration
import { collection, getDoc, doc } from 'firebase/firestore';

function Protected() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchRole = async () => {
      // Check if location.state is provided and destructure userUID and role
      if (!location.state || !location.state.userUID || !location.state.role) {
        console.error('Invalid state passed to Protected component');
        navigate('/login');
        return;
      }

      const userUID = location.state.userUID;
      const selectedRole = location.state.role;

      try {
        console.log("This is the given user UID" , userUID)
        console.log("This is the given role", location.state.role)
        const roleDocRef = doc(collection(db, 'Roles'), userUID); // Reference to the document with ID 'userUID'
        const roleDoc = await getDoc(roleDocRef); // Get the document
        
        if (roleDoc.exists()) {
          //console.log("I GOT ", roleDoc.data().role);
          const userRole = roleDoc.data().role; // Get the role attribute

          if (selectedRole === 'Startup') {
            navigate('/Startup' , { state: { ID: userRole } });
          } else if (selectedRole === 'Investor') {
            navigate('/InvestorMain', { state: { ID: userRole } });
          } 
          else if (selectedRole === 'Guest') {
            navigate('/Guest', { state: { ID: userRole } });
          }else {
            console.error('Role not recognized');
            navigate('/');
          }
        } else {
          console.error('No such document!');
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching role:', error);
        navigate('/login');
      }
    };

    searchRole();
  }, [navigate, location.state]);

  // User is not signed in, already navigated
  return null;
}

export default Protected;
