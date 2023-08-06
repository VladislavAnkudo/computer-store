import {Route, Routes} from "react-router-dom"
import './normalize.css'
import './App.css';

import {Layout} from './layout/Layout'
import {Home} from './pages/Home';
import {News} from './pages/News';
import {Contact} from './pages/Contact';
import {NotFound} from './pages/NotFound';
import {About} from './pages/About';
import {Faq} from './pages/Faq';
import {Shop} from './pages/Shop';
import {DevicePage} from './pages/DevicePage';
import {Basket} from './pages/Basket';
import {Wishlist} from './pages/Wishlist';
import {Auth} from './pages/Auth';
import {Order} from './pages/Order';
import {AuthLinks} from './component/AuthModal';
import {Admin} from './pages/Admin'

import SearchResultsPage from './component/SearchResultsPage ';
function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="shop" element={<Shop/>}/>
            <Route path="search" element={<SearchResultsPage/>}/>
            <Route path="admin" element={<Admin/>}/>
            <Route path="shop/:id" element={<DevicePage/>}/>
            <Route path="news" element={<News/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="contact" element={<Contact/>}/>
            <Route path="auth" element={<Auth/>}/>
            <Route path="auth/:title" element={<AuthLinks/>}/>
            <Route path="faq" element={<Faq/>}/>
            <Route path="wishlist" element={<Wishlist/>}/>
            <Route path="basket" element={<Basket/>}/>
            <Route path="basket/:title" element={<Order/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Route>
        </Routes>
    </>
  );
}

export default App;
