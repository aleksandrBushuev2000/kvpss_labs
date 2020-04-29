import './css/carousel.css';
import './css/navbar.css';
import './css/global.css'

import { Navbar } from './components/Navbar';
import { Carousel } from './components/Carousel';

document.addEventListener("DOMContentLoaded", (ev) => {
    const globalNavbar = new Navbar(document.querySelector("header#nav-header"));
    const carousel = new Carousel(document.querySelector("div#page-carousel"), 5000);
    globalNavbar.bind();
    carousel.bind();
})