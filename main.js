import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Preload images
const imgCoding = new Image(); imgCoding.src = '/character_coding.png';
const imgStanding = new Image(); imgStanding.src = '/character_standing.png';
const imgWalking = new Image(); imgWalking.src = '/character_walking.png';

// Glitch effect on title
const glitchText = document.querySelector('.glitch');
setInterval(() => {
  glitchText.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
  setTimeout(() => {
    glitchText.style.transform = 'translate(0, 0)';
  }, 50);
}, 3000);

// Scroll Animations for sections
const panels = gsap.utils.toArray('.panel');

panels.forEach((panel, i) => {
  // Fade in content
  const content = panel.querySelector('.section-content') || panel.querySelector('.hero-content');
  
  if (content) {
    gsap.fromTo(content, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: panel,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
});

// Character Animation Logic
const character = document.getElementById('anime-character');
const charContainer = document.getElementById('character-container');

// Timeline for character moving as we scroll
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: 'main',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      // State Machine for Character Image
      if (progress < 0.1) {
        if (character.src !== imgCoding.src) character.src = imgCoding.src;
      } else if (progress >= 0.1 && progress < 0.15) {
        if (character.src !== imgStanding.src) character.src = imgStanding.src;
      } else {
        if (character.src !== imgWalking.src) character.src = imgWalking.src;
      }
    }
  }
});

// As we scroll through sections, the character reacts
// Hero -> About (character moves up and changes state to standing)
tl.to(character, {
  scale: 1.1,
  y: -50,
  filter: 'drop-shadow(0 0 40px rgba(112, 0, 255, 0.6))',
  ease: 'power1.inOut'
}, "0")

// About -> Experience (character starts walking left)
.to(charContainer, {
  x: '-5vw',
  ease: 'power1.inOut'
}, "0.2")

// Experience -> Projects (character floating effect while walking)
.to(character, {
  y: 0,
  filter: 'drop-shadow(0 0 30px rgba(0, 240, 255, 0.6))',
  ease: 'power1.inOut'
}, "0.5")

// Projects -> Skills (walks right)
.to(charContainer, {
  x: '5vw',
  ease: 'power1.inOut'
}, "0.7")

// Skills -> Contact (final pose)
.to(character, {
  scale: 1,
  y: 20,
  filter: 'drop-shadow(0 0 50px rgba(0, 240, 255, 0.8))',
  ease: 'power1.inOut'
}, "0.9");
