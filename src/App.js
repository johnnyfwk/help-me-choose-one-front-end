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
    const [isAccountCreatedMessageVisible, setIsAccountCreatedMessageVisible] = useState(false);
    const [isAccountNotCreatedMessageVisible, setIsAccountNotCreatedMessageVisible] = useState(false);
    const [isLoggedInMessageVisible, setIsLoggedInMessageVisible] = useState(false);
    const [isLoggedOutMessageVisible, setIsLoggedOutMessageVisible] = useState(false);
    const [isVoteAddedMessageVisible, setIsVoteAddedMessageVisible] = useState(false);
    const [isVoteNotAddedMessageVisible, setIsVoteNotAddedMessageVisible] = useState(false);
    const [isPostCreatedMessageVisible, setIsPostCreatedMessageVisible] = useState(false);
    const [isPostNotCreatedMessageVisible, setIsPostNotCreatedMessageVisible] = useState(false);
    const [isPostUpdatedMessageVisible, setIsPostUpdatedMessageVisible] = useState(false);
    const [isPostNotUpdatedMessageVisible, setIsPostNotUpdatedMessageVisible] = useState(false);
    const [isCommentPostedMessageVisible, setIsCommentPostedMessageVisible] = useState(false);
    const [isCommentNotPostedMessageVisible, setIsCommentNotPostedMessageVisible] = useState(false);
    const [isCommentUpdatedMessageVisible, setIsCommentUpdatedMessageVisible] = useState(false);
    const [isCommentNotUpdatedMessageVisible, setIsCommentNotUpdatedMessageVisible] = useState(false);
    const [isCommentDeletedMessageVisible, setIsCommentDeletedMessageVisible] = useState(false);
    const [isCommentNotDeletedMessageVisible, setIsCommentNotDeletedMessageVisible] = useState(false);
    const [isPostDeletedMessageVisible, setIsPostDeletedMessageVisible] = useState(false);
    const [isPostNotDeletedMessageVisible, setIsPostNotDeletedMessageVisible] = useState(false);
    const [isAvatarUpdatedMessageVisible, setIsAvatarUpdatedMessageVisible] = useState(false);
    const [isAvatarNotUpdatedMessageVisible, setIsAvatarNotUpdatedMessageVisible] = useState(false);
    const [isPasswordUpdatedMessageVisible, setIsPasswordUpdatedMessageVisible] = useState(false);
    const [isPasswordNotUpdatedMessageVisible, setIsPasswordNotUpdatedMessageVisible] = useState(false);
    const [isAccountDeletedMessageVisible, setIsAccountDeletedMessageVisible] = useState(false);
    const [isAccountNotDeletedMessageVisible, setIsAccountNotDeletedMessageVisible] = useState(false);

    const numberOfItemsToDisplayAndIncrement = 20;

    function onClickLogOutButton() {
        setUserLoggedIn({});
        setIsLoggedOutMessageVisible(true);
        setTimeout(() => setIsLoggedOutMessageVisible(false), 3000);
    }

    const styleAccountCreatedMessage = {
        bottom: isAccountCreatedMessageVisible ? "0%" : "-100%"
    }

    const styleAccountNotCreatedMessage = {
        bottom: isAccountNotCreatedMessageVisible ? "0%" : "-100%"
    }

    const styleLoggedInMessage = {
        bottom: isLoggedInMessageVisible ? "0%" : "-100%"
    }

    const styleLoggedOutMessage = {
        bottom: isLoggedOutMessageVisible ? "0%" : "-100%"
    }

    const styleVoteAddedMessage = {
        bottom: isVoteAddedMessageVisible ? "0%" : "-100%"
    };

    const styleVoteNotAddedMessage = {
        bottom: isVoteNotAddedMessageVisible ? "0%" : "-100%"
    };

    const stylePostCreatedMessage = {
        bottom: isPostCreatedMessageVisible ? "0%" : "-100%"
    }

    const stylePostNotCreatedMessage = {
        bottom: isPostNotCreatedMessageVisible ? "0%" : "-100%"
    }

    const stylePostUpdatedMessage = {
        bottom: isPostUpdatedMessageVisible ? "0%" : "-100%"
    }

    const stylePostNotUpdatedMessage = {
        bottom: isPostNotUpdatedMessageVisible ? "0%" : "-100%"
    }

    const styleCommentPostedMessage = {
        bottom: isCommentPostedMessageVisible ? "0%" : "-100%"
    }

    const styleCommentNotPostedMessage = {
        bottom: isCommentNotPostedMessageVisible ? "0%" : "-100%"
    }

    const styleCommentUpdatedMessage = {
        bottom: isCommentUpdatedMessageVisible ? "0%" : "-100%"
    }

    const styleCommentNotUpdatedMessage = {
        bottom: isCommentNotUpdatedMessageVisible ? "0%" : "-100%"
    }

    const styleCommentDeletedMessage = {
        bottom: isCommentDeletedMessageVisible ? "0%" : "-100%"
    }

    const styleCommentNotDeletedMessage = {
        bottom: isCommentNotDeletedMessageVisible ? "0%" : "-100%"
    }

    const stylePostDeletedMessage = {
        bottom: isPostDeletedMessageVisible ? "0%" : "-100%"
    }

    const stylePostNotDeletedMessage = {
        bottom: isPostNotDeletedMessageVisible ? "0%" : "-100%"
    }

    const styleAvatarUpdatedMessage = {
        bottom: isAvatarUpdatedMessageVisible ? "0%" : "-100%"
    }

    const styleAvatarNotUpdatedMessage = {
        bottom: isAvatarNotUpdatedMessageVisible ? "0%" : "-100%"
    }

    const stylePasswordUpdatedMessage = {
        bottom: isPasswordUpdatedMessageVisible ? "0%" : "-100%"
    }

    const stylePasswordNotUpdatedMessage = {
        bottom: isPasswordNotUpdatedMessageVisible ? "0%" : "-100%"
    }

    const styleAccountDeletedMessage = {
        bottom: isAccountDeletedMessageVisible ? "0%" : "-100%"
    }

    const styleAccountNotDeletedMessage = {
        bottom: isAccountNotDeletedMessageVisible ? "0%" : "-100%"
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
                <Route
                    path="/"
                    element={
                        <Home numberOfItemsToDisplayAndIncrement={numberOfItemsToDisplayAndIncrement} />
                    }
                />
                <Route
                    path="/sign-up"
                    element={
                        <SignUp
                            setIsAccountCreatedMessageVisible={setIsAccountCreatedMessageVisible}
                            setIsAccountNotCreatedMessageVisible={setIsAccountNotCreatedMessageVisible}
                        />
                    } />
                <Route path="/log-in" element={<LogIn setIsLoggedInMessageVisible={setIsLoggedInMessageVisible} />} />
                <Route
                    path="/post/:post_id_and_title"
                    element={
                        <Post
                            isVotesVisible={isVotesVisible}
                            setIsVotesVisible={setIsVotesVisible}
                            setIsVoteAddedMessageVisible={setIsVoteAddedMessageVisible}
                            setIsVoteNotAddedMessageVisible={setIsVoteNotAddedMessageVisible}
                            setIsPostUpdatedMessageVisible={setIsPostUpdatedMessageVisible}
                            setIsPostNotUpdatedMessageVisible={setIsPostNotUpdatedMessageVisible}
                            setIsCommentPostedMessageVisible={setIsCommentPostedMessageVisible}
                            setIsCommentNotPostedMessageVisible={setIsCommentNotPostedMessageVisible}
                            setIsCommentUpdatedMessageVisible={setIsCommentUpdatedMessageVisible}
                            setIsCommentNotUpdatedMessageVisible={setIsCommentNotUpdatedMessageVisible}
                            setIsCommentDeletedMessageVisible={setIsCommentDeletedMessageVisible}
                            setIsCommentNotDeletedMessageVisible={setIsCommentNotDeletedMessageVisible}
                            setIsPostDeletedMessageVisible={setIsPostDeletedMessageVisible}
                            setIsPostNotDeletedMessageVisible={setIsPostNotDeletedMessageVisible}
                        />
                    } />
                <Route
                    path="/create-post"
                    element={
                        <CreatePost
                            setIsPostCreatedMessageVisible={setIsPostCreatedMessageVisible}
                            setIsPostNotCreatedMessageVisible={setIsPostNotCreatedMessageVisible} />
                    } />
                <Route
                    path="/user/:user_id"
                    element={
                        <Profile
                            setIsCommentUpdatedMessageVisible={setIsCommentUpdatedMessageVisible}
                            setIsCommentNotUpdatedMessageVisible={setIsCommentNotUpdatedMessageVisible}
                            setIsCommentDeletedMessageVisible={setIsCommentDeletedMessageVisible}
                            setIsCommentNotDeletedMessageVisible={setIsCommentNotDeletedMessageVisible}
                            setIsAvatarUpdatedMessageVisible={setIsAvatarUpdatedMessageVisible}
                            setIsAvatarNotUpdatedMessageVisible={setIsAvatarNotUpdatedMessageVisible}
                            setIsPasswordUpdatedMessageVisible={setIsPasswordUpdatedMessageVisible}
                            setIsPasswordNotUpdatedMessageVisible={setIsPasswordNotUpdatedMessageVisible}
                            setIsAccountDeletedMessageVisible={setIsAccountDeletedMessageVisible}
                            setIsAccountNotDeletedMessageVisible={setIsAccountNotDeletedMessageVisible}
                        />
                    }
                />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />

            <div id="account-created-message" style={styleAccountCreatedMessage}>Account has been created</div>
            <div id="account-not-created-message" style={styleAccountNotCreatedMessage}>Account could not be created</div>
            <div id="logged-in-message" style={styleLoggedInMessage}>You have logged in</div>
            <div id="logged-out-message" style={styleLoggedOutMessage}>You have logged out</div>
            <div id="vote-added-message" style={styleVoteAddedMessage}>Your vote bas been added</div>
            <div id="vote-not-added-message" style={styleVoteNotAddedMessage}>Your vote could not be added</div>
            <div id="post-created-message" style={stylePostCreatedMessage}>Your post has been created</div>
            <div id="post-not-created-message" style={stylePostNotCreatedMessage}>Your post could not be created</div>
            <div id="post-updated-message" style={stylePostUpdatedMessage}>Your post has been updated</div>
            <div id="post-not-updated-message" style={stylePostNotUpdatedMessage}>Your post could not be updated</div>
            <div id="comment-posted-message" style={styleCommentPostedMessage}>Your comment has been posted</div>
            <div id="comment-not-posted-message" style={styleCommentNotPostedMessage}>Your post could not be posted</div>
            <div id="comment-updated-message" style={styleCommentUpdatedMessage}>Your comment has been updated</div>
            <div id="comment-not-updated-message" style={styleCommentNotUpdatedMessage}>Your post could not be updated</div>
            <div id="comment-deleted-message" style={styleCommentDeletedMessage}>Your comment has been deleted</div>
            <div id="comment-not-deleted-message" style={styleCommentNotDeletedMessage}>Your comment could not be deleted</div>
            <div id="post-deleted-message" style={stylePostDeletedMessage}>Your post was deleted</div>
            <div id="post-not-deleted-message" style={stylePostNotDeletedMessage}>Your post could not be deleted</div>
            <div id="avatar-updated-message" style={styleAvatarUpdatedMessage}>Your avatar was updated</div>
            <div id="avatar-not-updated-message" style={styleAvatarNotUpdatedMessage}>Your avatar could not be updated</div>
            <div id="password-updated-message" style={stylePasswordUpdatedMessage}>Your password was updated</div>
            <div id="password-not-updated-message" style={stylePasswordNotUpdatedMessage}>Your password could not be updated</div>
            <div id="account-deleted-message" style={styleAccountDeletedMessage}>Your account was deleted</div>
            <div id="account-not-deleted-message" style={styleAccountNotDeletedMessage}>Your account could not be deleted</div>
        </div>
    );
}

export default App;