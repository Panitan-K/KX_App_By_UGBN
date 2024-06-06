
import './css/App.css';
import Title from './image/logo/KX.png';
import { useNavigate} from "react-router-dom";


function Welcome() {
  const navigate = useNavigate();

    return (
       /* STATIC BAR */
       <div className="AppMain">
        <div className="welcome-container">
        <img src={Title} alt="Welcome" className='UphasiaMiddleLogo'/>
          <div className="LogRegContainer">
            <button className='LogRegbox1' onClick={() => navigate('/InvestorMain')}>INVESTORS</button>
            <button className='LogRegbox1' onClick={() => navigate('/Startup')}>STARTUPS</button>
          </div>

        </div>
      </div>
    );
  }

  
export default Welcome;

