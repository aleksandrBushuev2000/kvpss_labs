import { CycledList } from '../utils/CycledList';

export class Carousel {
    constructor(carouselContainer, tickInterval) {
        this.carouselList = new CycledList();
        this.makeCarouselSlides(carouselContainer);
        this.iterator = this.carouselList.createIterator();

        this.tickInterval = tickInterval;

        this.PREV = "carousel-item carousel-item-prev";
        this.CURR = "carousel-item carousel-item-active";
        this.NEXT = "carousel-item";
    }

    makeCarouselSlides(container) {
        let slides = container.querySelectorAll(".carousel-items > .carousel-item");
        if (slides.length < 2) {
            throw new Error("Slides count shoud be > 1");
        } 
        slides.forEach(slide => this.carouselList.push(slide));
    }

    tick() {
        let current = this.iterator.next();
        let next = this.iterator.peekNext();
        let prev = this.iterator.peekPrev();
        next.className = this.NEXT;
        prev.className = this.PREV;
        current.className = this.CURR;
    }

    initialTick() {
        this.iterator.peekCurrent().className = this.CURR;
        this.iterator.peekNext().className = this.NEXT;
    }

    bind() {
        this.initialTick();
        setInterval(() => this.tick(), this.tickInterval);
    }


}

