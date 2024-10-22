import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenisInit } from './js/lenisInit.js'
import { data } from './data/data.js'

// Utils
gsap.registerPlugin(ScrollTrigger)
// lenisInit()

// Main code
const scroller = document.querySelector('.scroll')
const sections = gsap.utils.toArray('.scroll section')

const scrollTween = gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: 'none',
  duration: 0.5,
})

ScrollTrigger.create({
  animation: scrollTween,
  trigger: '.scroll',
  end: '+=' + scroller.offsetWidth,
  snap: {
    snapTo: 1 / (sections.length - 1),
    delay: 0.2,
    duration: 0.1,
    onComplete: (self) => {
      const progress = self.progress
      const currentIndex = Math.round(progress * (sections.length - 1))
      let timers = [];

      sections.forEach((section, index) => {
        if (index === currentIndex) {
          clearTimeout(timers[currentIndex]);
          const timer = setTimeout(() => {
            sections[currentIndex].querySelector('h1').innerHTML = `
        id: ${data[currentIndex].id}
        <br />
        title: ${data[currentIndex].title}
        <br />
        description: ${data[currentIndex].description}
      `;
          }, 800);
          timers[currentIndex] = timer; // Сохранение таймера
        } else {
          sections[index].querySelector('h1').innerHTML = 'Loading...';
        }
      });
    },
  },
  pin: true,
  scrub: 1,
})

sections.forEach(section => {
  gsap.from(section.querySelector('h1'), {
    opacity: 0,
    y: -100,
    scrollTrigger: {
      trigger: section.querySelector('h1'),
      containerAnimation: scrollTween,
      start: 'left center',
      toggleActions: 'play none none reverse',
    },
  })
})