export class Navbar {

    private navbarButton : HTMLDivElement;
    private desktopNavbar : HTMLDivElement;
    private mobileNavbar : HTMLDivElement;

    private isMobileNavbarOpen : boolean;

    private HIDDEN_MOBILE_NAVBAR : string = "navbar-hidden";
    private OPEN_BUTTON : string = "open";

    constructor(header : HTMLDivElement) {
        this.navbarButton = header.querySelector("div.navbar-btn");
        this.desktopNavbar = header.querySelector("nav.navbar");
        this.mobileNavbar = header.querySelector("nav.navbar-mobile");

        this.isMobileNavbarOpen = false;
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