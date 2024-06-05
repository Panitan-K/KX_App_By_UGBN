
import './css/App.css';
import { useState/*, useEffect*/ } from 'react';
/*import { useLocation } from 'react-router-dom';
import { db } from './Firebase';
import {  collection, getDocs, doc, getDoc } from 'firebase/firestore';
import HomeIcon from './image/svg/Home.png';*/

import UserIcon from './image/svg/person.png';
import Title from './image/logo/Uphasia.png';
import { Link,useNavigate} from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("/option1");




  
  const handleMode = (USERMode) => {
    setMode(USERMode);
  };


    return (
       /* STATIC BAR */
       <div className="App">
       <div className="static-bar">
       <div className="left-content">

       <Link to="/">
           <img className="title-image" src={Title} alt="Title"  onClick={() => handleMode('/585')} />
        </Link>
       </div>

       <div className="Middle-content">
        <h1>Main Dashboard</h1>
       </div>
      <div className='right-content'>

       <div className="ProfileBox" onClick={() => navigate('/Dashboard')}>
         <img src={UserIcon} alt="UGBN" className="UserIcon" />
         <h1 className="ProfileText">Name </h1> 
       </div>
      </div>

     </div>

        <div className="Dashboard">
          <div className='etcBoard'>
            <h1>KID MAI ORK SAI LAI DEE</h1>
            <h1>Laew Ja aoo Design diew 4 mode with Mai lohr?</h1>
            </div>
          <div className="modetab">

            <div className='ModeHeading'>
            <h1>Pratice</h1>
            </div>
          
            
        
            <div
              className={`sidebar-option ${mode === '/option3' ? 'active' : ''}`}
              onClick={() => navigate('/Naming')}
            >
              <span>การเรียกชื่อ Naming</span>
              
            </div>


            <div
              className={`sidebar-option ${mode === '/option4' ? 'active' : ''}`}
              onClick={() => navigate('/Rep')}
            >
            
              <span>การพูดตาม Repetition</span>
            </div>
            <div
              className={`sidebar-option ${mode === '/option2' ? 'active' : ''}`}
              onClick={() => navigate('/Comprehension')}
            >
             
              <span>ความเข้าใจ Comprehension</span>
            </div>
            <div
              className={`sidebar-option ${mode === '/option5' ? 'active' : ''}`}
              onClick={() => navigate('/Speech')}
            >
              
              <span>ความคล่องในการพูด Speech Fluency</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
export default Home;

