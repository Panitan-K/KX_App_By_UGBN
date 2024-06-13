import './css/App.css';
import React, {useEffect} from 'react';

import U16_9 from "./image/Mock/Uphasia16_9.png"

import Revert from "./image/svg/Revert.png"
import { useNavigate} from "react-router-dom";

function StartupInfo() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
  }, []);
  return (

    <div className="App">

        <div className='static-bar'>
            <img src={Revert} alt="Welcome" className='Revertbutton' onClick={() => navigate('/InvestList')}/>
            <p> Uphasia</p>
        </div>
      
        <div className='AppWithHeaderContent'>

            <div className='StartupsInfoBlocks2'>
                <img src={U16_9} alt="Welcome"/>
                <table className='StartupTable2'>
                    <tr>
                        <td>Startup</td>
                        <td>:</td>
                        <td>Uphasia</td>
                    </tr>
                    <tr>
                        <td>Industry</td>
                        <td>:</td>
                        <td>HealthTech</td>
                    </tr>
                    <tr>
                        <td>Stage</td>
                        <td>:</td>
                        <td>Pre-Seed</td>
                    </tr>
                    <tr>
                        <td colSpan="3">
                        <div className="appleInputContainer">
                            <label className="appleInputLabel">Introduction</label>
                            <textarea
                            type="text"
                            className="appleInput"
                            value={"We are Uphasia—the solution for communication disorders in the Thai dialect. As we enter an aging society, dementia becomes inevitable.\n\nDementia or any damage to the brain could cause a person to lose the ability to comprehend and produce speech, which overall degrades their well-being.\n\nThe traditional solution is for Speech-Language Pathologists (SLPs) to provide rehabilitation to improve or delay the speech condition.\n\nHowever, the availability of SLPs in Thailand is limited to 200 SLPs for 600,000 patients, resulting in a ratio of 1 to 3,000.\n\nUphasia aims to digitalize the speech rehabilitation process through an online platform that would allow everyone using the Thai dialect to access rehabilitation utilizing cutting-edge ASR technology, which we will further co-develop with the only SLP school in Thailand, Ramathibodi Hospital."}
                            readOnly
                        
                            />
                        </div>
                        </td>
                    </tr>
                </table>
                
                <button className='InvestButton' onClick={() => navigate('/Invest')} >INVEST IN Uphasia</button>
            </div>
            
         
        </div>
      

    </div>



  );
}

export default StartupInfo;