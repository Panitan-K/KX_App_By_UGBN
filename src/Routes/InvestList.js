import './css/App.css';
import React from 'react';
import IMG_16_9 from "./image/Mock/16_9_PlaceHolder.png"
import U16_9 from "./image/Mock/Uphasia16_9.png"
import Scam from "./image/Mock/Scamify.png"
import Revert from "./image/svg/Revert.png"
import { useNavigate} from "react-router-dom";

function InvestList() {
  const navigate = useNavigate();

  return (

    <div className="App">

        <div className='static-bar'>
            <img src={Revert} alt="Welcome" className='Revertbutton' onClick={() => navigate('/InvestorMain')}/>
            <p> Startups</p>
        </div>
      
        <div className='AppWithHeaderContent'>

            <div className='StartupsInfoBlocks' onClick={() => navigate('/StartupInfo')} >
                <img src={U16_9} alt="Welcome"/>
                <table className='StartupTable'>
                    <tr>
                        <td>Startup</td>
                        <td>: Uphasia</td>
                    </tr>
                    <tr>
                        <td>Industry</td>
                        <td>: HealthTech</td>
                    </tr>
                    <tr>
                        <td>Stage</td>
                        <td>: Pre-Seed</td>
                    </tr>
                </table>
            </div>
            <div className='StartupsInfoBlocks'>
                <img src={Scam} alt="Welcome"/>
                <table className='StartupTable'>
                    <tr>
                        <td>Startup</td>
                        <td>: Scamify</td>
                    </tr>
                    <tr>
                        <td>Industry</td>
                        <td>: Digital Technology</td>
                    </tr>
                    <tr>
                        <td>Stage</td>
                        <td>: Pre-Seed</td>
                    </tr>
                </table>
            </div>
            <div className='StartupsInfoBlocks'>
                <img src={IMG_16_9} alt="Welcome"/>
                <table className='StartupTable'>
                    <tr>
                        <td>Startup</td>
                        <td>: StartupName</td>
                    </tr>
                    <tr>
                        <td>Industry</td>
                        <td>: StartupIndustry</td>
                    </tr>
                    <tr>
                        <td>Stage</td>
                        <td>: StartupStage</td>
                    </tr>
                </table>
            </div>
        </div>
      

    </div>



  );
}

export default InvestList;