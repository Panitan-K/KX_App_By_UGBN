import './css/App.css';

import UserIcon from './image/svg/person.png';
import Title from './image/logo/Uphasia.png';
import { Link } from "react-router-dom";



function Naming() {

 


    return (
      /* STATIC BAR */
      <div className="App">
      <div className="static-bar">
      <div className="left-content">

      <Link to="/Home">
          <img className="title-image" src={Title} alt="Title"   />
       </Link>
      </div>

      <div className="Middle-content">
       <h1>Naming Excerise</h1>
      </div>
     <div className='right-content'>

      <div className="ProfileBox">
        <img src={UserIcon} alt="UGBN" className="UserIcon" />
        <h1 className="ProfileText">Name EIEI</h1>
      </div>
     </div>

    </div>

       <div className="Dashboard">
         <div className='etcBoard'>
           <h1>SAI FEATURE LOHR ? Mai Whai Lork</h1>
           </div>
         <div className="modetab">

           <div className='ModeHeading'>
           <h1>N/A Block 1 </h1>
           </div>
         
           
       
           <div
             className={`sidebar-option`}
            
           >
             <span>N/A Block 2</span>
             
           </div>


           <div
             className={`sidebar-option`}
     
           >
           
           <span>N/A Block 3</span>
           </div>
           <div
             className={`sidebar-option`}
            
           >
            
            <span>N/A Block 4</span>
           </div>
           <div
             className={`sidebar-option`}
            
           >
             
             <span>N/A Block 5</span>
           </div>
         </div>
       </div>
     </div>
   );
  }

  
export default Naming;

