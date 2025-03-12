const track = document.getElementById("image-track");

const handleOnDown = e => {
  if (window.innerWidth <= 768) return; // Disable on mobile
  track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
  if (window.innerWidth <= 768) return; // Disable on mobile
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if (window.innerWidth <= 768) return; // Disable on mobile
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

document.querySelectorAll('.image-link').forEach(link => {
  link.addEventListener('dragstart', event => {
    event.preventDefault(); // Sürükleme olayını engeller
  });
});

document.querySelectorAll('.image').forEach(img => {
  img.addEventListener('dragstart', event => {
    event.preventDefault(); // Resimlerin sürüklenmesini engeller
  });
});

// Handle window resize
let windowWidth = window.innerWidth;
window.addEventListener('resize', () => {
  // Check if window crossed the mobile breakpoint
  if ((windowWidth > 768 && window.innerWidth <= 768) || 
      (windowWidth <= 768 && window.innerWidth > 768)) {
    
    location.reload(); // Reload to apply proper layout
  }
  windowWidth = window.innerWidth;
});

document.addEventListener("DOMContentLoaded", () => {
  const imageTrack = document.getElementById('image-track');
  if (imageTrack) {
    // Initialize differently based on device width
    if (window.innerWidth <= 768) {
      // Mobile setup
      imageTrack.style.left = "0";
      imageTrack.style.top = "0";
      imageTrack.style.transform = "none";
    } else {
      // Desktop setup
      imageTrack.style.left = "50%";
      imageTrack.style.top = "55%";
      imageTrack.style.transform = "translate(0%, -50%)";
    }
    
    // Konumlandırmayı yap
    imageTrack.dataset.mouseDownAt = "0";
    imageTrack.dataset.prevPercentage = "0";
  }
  
  // Mobile menu toggle functionality
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  
  if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
    });
  }
  
  // Close mobile menu when a link is clicked
  const navLinks = document.querySelectorAll('.navbar a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    });
  });
});

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

// Scroll sections active link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    
    if(top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']')?.classList.add('active');
      });
    }
  });
};