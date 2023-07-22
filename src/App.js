import './App.css';
import { Routes, Route } from 'react-router-dom';
import Logo from './components/Logo';
import ShowNavButton from './components/ShowNavButton';
import HideNavButton from './components/HideNavButton';
import Nav from './components/Nav';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import About from './pages/About';
import Contact from './pages/Contact';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';
import Footer from './components/Footer';
import Error404 from './pages/Error404';

function App() {
    return (
        <div className="App">
            <div id="logo-and-hide-nav-button">
                <Logo />
                <ShowNavButton />
            </div>
            
            <div id="nav-and-hide-nav-button">
                <HideNavButton />
                <Nav />
            </div>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/log-in" element={<LogIn />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/profile/" element={<Profile />} />
                <Route path="/profile/:user_id" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;