import './App.css';
import { Routes, Route } from 'react-router-dom';
import Logo from './components/Logo';
import Nav from './components/Nav';
import Home from './pages/Home';
import Main from './pages/Main';

function App() {
    return (
        <div className="App">
            <Logo />
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/main" element={<Main />} />
            </Routes>
        </div>
    );
}

export default App;