import { CycledList } from '../utils/cycled_list/CycledList';
import { CycledListIterator } from '../utils/cycled_list/CycledListIterator';
import { sleep } from '../utils/sleep/sleep';

import { mdiArrowLeftDropCircle, mdiArrowRightDropCircle } from '@mdi/js';

class CarouselSlide {
    private image : HTMLDivElement;
    private control : HTMLDivElement;
    private index : number;

    constructor(image : HTMLDivElement, control : HTMLDivElement, index : number) {
        this.image = image;
        this.control = control;
        this.index = index;
    }

    getImage() : HTMLDivElement {
        return this.image;
    }

    getControl() : HTMLDivElement {
        return this.control;
    }

    getIndex() : number {
        return this.index;
    }
}

export class Carousel {
    private carouselList : CycledList<CarouselSlide>;
    private iterator : CycledListIterator<CarouselSlide>;

    private tickIntervalNumber : number;
    private tickInterval : NodeJS.Timeout;

    private PREV = "carousel-item carousel-item-prev";
    private CURRENT = "carousel-item carousel-item-active";
    private NEXT = "carousel-item";

    private BEFORE_REVERSE_ACTIVE = "carousel-item carousel-item-before-reverse-active";
    private REVERSE_ACTIVE = "carousel-item carousel-item-reverse-active";
    private REVERSE_PREV = "carousel-item carousel-item-reverse-prev";

    private CAROUSEL_CONTROL_ACTIVE = "carousel-control carousel-control-active";
    private CAROUSEL_CONTROL_DEFAULT = "carousel-control";
    private CAROUSEL_CONTROLS_WRAPPER = "carousel-controls-wrapper";

    private BAD_SLIDES_COUNT = "Slides count shoud be > 1";

    private isAnimationPending : boolean;

    private needSetInterval : boolean;

    constructor(carouselContainer : HTMLDivElement, tickInterval : number) {
        this.carouselList = new CycledList<CarouselSlide>();
        this.makeCarouselSlides(carouselContainer);
        this.iterator = this.carouselList.createIterator();

        this.isAnimationPending = false;
        this.needSetInterval = true;
        this.tickIntervalNumber = tickInterval;

        window.addEventListener('blur', this.mouseOverListener.bind(this));
        window.addEventListener('focus', this.mouseOutListener.bind(this));
        carouselContainer.onmouseover = this.mouseOverListener.bind(this);
        carouselContainer.onmouseout = this.mouseOutListener.bind(this);
    }

    private mouseOverListener(ev : Event) {
        this.needSetInterval = false;
        clearInterval(this.tickInterval);
    }

    private mouseOutListener(ev : Event) {
        this.needSetInterval = true;
        this.setInterval();
    }

    private async controlClickListener(clickedSlide : CarouselSlide) {
        let current = this.iterator.peekCurrent();
        if (current != clickedSlide) {
            clearInterval(this.tickInterval);
            let active = clickedSlide;

            active.getControl().className = this.CAROUSEL_CONTROL_ACTIVE;
            current.getControl().className = this.CAROUSEL_CONTROL_DEFAULT;

            while (this.iterator.peekCurrent() != active) {
                this.iterator.next();
            }

            const activeImage = active.getImage();
            const currentImage = current.getImage();

            if (active.getIndex() < current.getIndex()) {
                active.getImage().className = this.BEFORE_REVERSE_ACTIVE;
                await sleep(15);

                activeImage.className = this.REVERSE_ACTIVE;
                currentImage.className = this.REVERSE_PREV;  
            } else {
                currentImage.className = this.PREV;
                activeImage.className = this.CURRENT;
            }
            this.setInterval();
        }
      
    }

    private bindCarouselSlides(slides : NodeListOf<HTMLDivElement>, controls : Array<HTMLDivElement>) {
        for (let i = 0; i < slides.length; i++) {
            let slide = slides[i];
            let index = i;
            let controlListItem = new CarouselSlide(slide, controls[index], index)
            this.carouselList.push(controlListItem);
            controls[index].onclick = (ev) => {
                this.controlClickListener(controlListItem);
            }

            slides[i].addEventListener('transitionstart',(ev) => {
                this.isAnimationPending = true;
            });

            slides[i].ontransitionend = (ev) => {
                this.transitionEndHandler(slides[i]);
            }
        }
    }

    private createControlsArray(slides : NodeListOf<HTMLDivElement>) : Array<HTMLDivElement> {
        let controlsArray : Array<HTMLDivElement> = [];

        slides.forEach(() => {
            let control = document.createElement('div');
            control.className = this.CAROUSEL_CONTROL_DEFAULT;
            controlsArray.push(control);
        })

        return controlsArray;
    }

    private bindArrows(container : HTMLDivElement) {
        let svgIcons = this.makeCarouselArrows();
        let leftArrow = <HTMLElement>container.querySelector("div.carousel-control-icon-left");
        leftArrow.append(svgIcons.left);
        leftArrow.onclick = (ev) => {if (!this.isAnimationPending) this.controlClickListener(this.iterator.peekPrev())};
        let rightArrow = <HTMLElement>container.querySelector("div.carousel-control-icon-right");
        rightArrow.append(svgIcons.right);
        rightArrow.onclick = (ev) => {if (!this.isAnimationPending) this.controlClickListener(this.iterator.peekNext())};
    }

    private makeCarouselArrows() {
        const namespaceUri = "http://www.w3.org/2000/svg";
        let leftIconSvg = document.createElementNS(namespaceUri, 'svg');
        let pathLeft = document.createElementNS(namespaceUri, "path");
        pathLeft.setAttributeNS(null, "d", mdiArrowLeftDropCircle);
        leftIconSvg.append(pathLeft);

        let rightIconSvg = document.createElementNS(namespaceUri, 'svg');
        let pathRight = document.createElementNS(namespaceUri, "path");
        pathRight.setAttributeNS(null, "d", mdiArrowRightDropCircle);
        rightIconSvg.append(pathRight);

        return {
            left : leftIconSvg,
            right : rightIconSvg
        }

    }

    private makeCarouselSlides(container : HTMLDivElement) {
        let slidesContainer = <HTMLDivElement>container.querySelector("div.carousel-items");
        let slides = <NodeListOf<HTMLDivElement>>slidesContainer.querySelectorAll("div.carousel-item");

        if (slides.length < 2) {
            throw new Error(this.BAD_SLIDES_COUNT);
        }

        let controlsWrapper = document.createElement('div');
        controlsWrapper.className = this.CAROUSEL_CONTROLS_WRAPPER;
        let controlsArray : Array<HTMLDivElement> = this.createControlsArray(slides);
        controlsWrapper.append(...controlsArray);
        slidesContainer.append(controlsWrapper);

        for (let i = 0; i < slides.length; i++) {
            let slide = slides[i];
            let index = i;
            let controlListItem = new CarouselSlide(slide, controlsArray[index], index)
            this.carouselList.push(controlListItem);
            controlsArray[index].onclick = (ev) => {
                this.controlClickListener(controlListItem);
            }

            slides[i].addEventListener('transitionstart',(ev) => {
                console.log("Start")
                this.isAnimationPending = true;
            });

            slides[i].ontransitionend = (ev) => {
                this.transitionEndHandler(slides[i]);
            }
        }

        this.bindCarouselSlides(slides, controlsArray);
        this.bindArrows(container);
    }

    private async transitionEndHandler(slide : HTMLDivElement) {
        if (slide.className.indexOf("active") == -1) {
            slide.className = this.NEXT;
        } if (slide.className == this.REVERSE_ACTIVE) {
            slide.className = this.CURRENT;
        } else {
            this.isAnimationPending = false;
        }
    }

    private tick() : void {
        let current = this.iterator.next();
        let next = this.iterator.peekNext();
        let prev = this.iterator.peekPrev();
        next.getImage().className = this.NEXT;
        prev.getImage().className = this.PREV;
        current.getImage().className = this.CURRENT;
        current.getControl().className = this.CAROUSEL_CONTROL_ACTIVE;
        prev.getControl().className = this.CAROUSEL_CONTROL_DEFAULT;
    }

    private initialTick() {
        let current = this.iterator.peekCurrent();
        current.getImage().className = this.CURRENT;
        current.getControl().className = this.CAROUSEL_CONTROL_ACTIVE;
        this.iterator.peekNext().getImage().className = this.NEXT;
    }

    private setInterval() : void {
        if (this.needSetInterval)
            this.tickInterval = setInterval(() => this.tick(), this.tickIntervalNumber);
    }

    bind() {
        this.initialTick();
        this.setInterval();
    }
}

