import './App.css';
import { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import Logo from './components/Logo';
import ShowNavButton from './components/ShowNavButton';
import Nav from './components/Nav';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Post from './pages/Post';
import CreatePost from './pages/CreatePost';
import About from './pages/About';
import Contact from './pages/Contact';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';
import Footer from './components/Footer';
import Error404 from './pages/Error404';

function App() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [isNavVisible, setIsNavVisible] = useState(false);
    const [isVotesVisible, setIsVotesVisible] = useState(false);

    const numberOfItemsToDisplayAndIncrement = 20;

    function onClickLogOutButton() {
        setUserLoggedIn({});
    }

    return (
        <div className="App">
            <div id="logo-show-nav-button-and-nav">
                <Logo />
                <ShowNavButton setIsNavVisible={setIsNavVisible} />
                <Nav
                    isNavVisible={isNavVisible}
                    setIsNavVisible={setIsNavVisible}
                    onClickLogOutButton={onClickLogOutButton}
                />
            </div>            
            <Routes>
                <Route path="/" element={<Home numberOfItemsToDisplayAndIncrement={numberOfItemsToDisplayAndIncrement} />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/log-in" element={<LogIn />} />
                <Route path="/post/:post_id_and_title" element={<Post isVotesVisible={isVotesVisible} setIsVotesVisible={setIsVotesVisible} />} />
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