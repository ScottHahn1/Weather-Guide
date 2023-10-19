import { useState, useRef, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './styles/App.css';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Hourly from "./pages/Hourly";
import Daily from "./pages/Daily";
import ThisWeek from "./pages/ThisWeek";
import Search from "./components/Search";
import { LocationContextProvider } from "./contexts/LocationContext";
import { UnitsContextProvider } from "./contexts/UnitsContext";
import ChangeUnits from "./components/ChangeUnits";
import MobileMenu from "./components/MobileMenu";
import NoPage from "./pages/NoPage";

function App() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);

  let prevScrollpos = window.scrollY;

  window.onscroll = function() {
    const currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos && headerRef.current) {
      headerRef.current.style.top = '0';
    } 
    else if (headerRef.current){
      headerRef.current.style.top = '-6rem';
      headerRef.current.style.backgroundColor = 'darkblue';
    }
    prevScrollpos = currentScrollPos;
  }

  return (
    <div className='app'>
      <LocationContextProvider>
        <UnitsContextProvider>
          <BrowserRouter>
            <header ref={headerRef}>
              <div className='heading'>
                <Link to='/'>
                  <h1>Weather Guide</h1>
                </Link>
                
                <div className='mobile-menu' onClick={() => setShowMobileMenu(!showMobileMenu)}>
                  <div className='mobile-menu-item'></div>
                  <div className='mobile-menu-item'></div>
                  <div className='mobile-menu-item'></div>
                </div>

                { showMobileMenu && <MobileMenu /> }

                <Search />
                <ChangeUnits />
              </div>
              <Navbar />
            </header>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/daily' element={<Daily />} />
                <Route path='/hourly' element={<Hourly />} />
                <Route path='/this-week' element={<ThisWeek />} />
                <Route path='*' element={<NoPage />} />
            </Routes>
          </BrowserRouter>
        </UnitsContextProvider>
      </LocationContextProvider>
    </div>
  );
}

export default App;
