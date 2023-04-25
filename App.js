
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes,Route, Link} from  'react-router-dom'
import Homescreen from './screens/Homescreen'
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path='/home' exact Component={Homescreen}/>
        <Route path='/:id/:fromdate/:todate' exact Component={Bookingscreen}/>
        <Route path='/register' exact Component={Registerscreen}/>
        <Route path='/login' exact Component={Loginscreen}/>
        <Route path='/profile' exact Component={Profilescreen}/>
        <Route path='/' exact Component={Landingscreen}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
