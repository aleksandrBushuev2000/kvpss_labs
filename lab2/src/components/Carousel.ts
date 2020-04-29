import { CycledList } from '../utils/cycled_list/CycledList';
import { CycledListIterator } from '../utils/cycled_list/CycledListIterator';
import { sleep } from '../utils/sleep/sleep';

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

    constructor(carouselContainer : HTMLDivElement, tickInterval : number) {
        this.carouselList = new CycledList<CarouselSlide>();
        this.makeCarouselSlides(carouselContainer);
        this.iterator = this.carouselList.createIterator();

        this.tickIntervalNumber = tickInterval;
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

            if (active.getIndex() < current.getIndex()) {
                active.getImage().className = this.BEFORE_REVERSE_ACTIVE;
                await sleep(15);

                active.getImage().className = this.REVERSE_ACTIVE;
                current.getImage().className = this.REVERSE_PREV;  
            } else {
                current.getImage().className = this.PREV;
                active.getImage().className = this.CURRENT;
            }

            this.tickInterval = setInterval(() => this.tick(), this.tickIntervalNumber);
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

        let controlsArray : Array<HTMLDivElement> = [];

        slides.forEach(slide => {
            let control = document.createElement('div');
            control.className = this.CAROUSEL_CONTROL_DEFAULT;
            controlsArray.push(control);
        })
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

            slides[i].ontransitionend = (ev) => {
                this.transitionEndHandler(slides[i]);
            }
        }

        let leftArrow = <HTMLElement>document.querySelector("div.carousel-control-icon-left");
        leftArrow.onclick = (ev) => this.controlClickListener(this.iterator.peekPrev());
        let rightArrow = <HTMLElement>document.querySelector("div.carousel-control-icon-right");
        rightArrow.onclick = (ev) => this.controlClickListener(this.iterator.peekNext());
    }

    private async transitionEndHandler(slide : HTMLDivElement) {
        await sleep(150);
        if (slide.className.indexOf("active") == -1) {
            slide.className = this.NEXT;
        } if (slide.className == this.REVERSE_ACTIVE) {
            slide.className = this.CURRENT;
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
        this.iterator.peekPrevPrev().getData().getImage().className = this.NEXT;
    }

    private initialTick() {
        let current = this.iterator.peekCurrent();
        current.getImage().className = this.CURRENT;
        current.getControl().className = this.CAROUSEL_CONTROL_ACTIVE;
        this.iterator.peekNext().getImage().className = this.NEXT;
    }

    bind() {
        this.initialTick();
        this.tickInterval = setInterval(() => this.tick(), this.tickIntervalNumber);
    }
}

