import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import Events from './pages/Events.jsx';
import Blog from './pages/Blog.jsx';
import Donations from './pages/Donations.jsx';
import Contact from './pages/Contact.jsx';
import Footer from './components/Footer.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import PuppyDetail from './pages/PuppyDetail.jsx';
import AdoptionForm from './pages/AdoptionForm.jsx';
import Checkout from './pages/Checkout.jsx';
import EventDetail from './pages/EventDetail.jsx';
import HowToHelp from './pages/HowToHelp.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import About from './pages/About.jsx';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animals" element={<Gallery />} />
        <Route path="/events" element={<Events />} />
        <Route path="/blog" element={<Blog />} />
        <Route path='/blog/:id' element={<BlogDetail/>} />
        <Route path="/donate" element={<Donations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/puppy/:id' element={<PuppyDetail/>} />
        <Route path="/adopt/:id" element={<AdoptionForm/>} />
        <Route path="/checkout/:amount/:isMonthly/:paymentMethod" element={<Checkout />} />
        <Route path="/event/:id" element={<EventDetail/>} />
        <Route path='/volunteer' element={<HowToHelp/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;