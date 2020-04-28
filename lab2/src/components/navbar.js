export class Navbar {
    constructor(header) {
        this.navbarButton = header.getElementsByClassName("navbar-btn")[0];
        this.desktopNavbar = header.getElementsByClassName("navbar")[0];
        this.mobileNavbar = header.getElementsByClassName("navbar-mobile")[0];

        this.isMobileNavbarOpen = false;

        this.HIDDEN_MOBILE_NAVBAR = "navbar-hidden";
        this.OPEN_BUTTON = "open";
    }

    navbarButtonClickEventHandler() {
        this.isMobileNavbarOpen = !this.isMobileNavbarOpen;
        if (!this.isMobileNavbarOpen) {
            this.navbarButton.classList.remove(this.OPEN_BUTTON);
            this.mobileNavbar.classList.add(this.HIDDEN_MOBILE_NAVBAR);
        } else {
            this.navbarButton.classList.add(this.OPEN_BUTTON);
            this.mobileNavbar.classList.remove(this.HIDDEN_MOBILE_NAVBAR);
        }

    }

    bind() {
        this.navbarButton.onclick = this.navbarButtonClickEventHandler.bind(this);
    }
}