import './global.sass'

import { Navbar } from './components/navbar';
import { Carousel } from './components/carousel';

document.addEventListener("DOMContentLoaded", (ev) => {
    const globalNavbar = new Navbar(document.getElementById("nav-header"));
    const carousel = new Carousel(document.getElementById("page-carousel"), 5000);
    globalNavbar.bind();
    carousel.bind();
})