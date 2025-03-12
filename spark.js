const canvas = document.getElementById('fireCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Responsive particle settings
const isMobile = window.innerWidth <= 768;
const amount = isMobile ? 25 : 50; // Reduce particles on mobile
const sizeRate = isMobile ? 0.996 : 0.998; // Faster shrinking on mobile for performance
const speedRate = isMobile ? 0.8 : 1; // Slower speed on mobile
const windSpeed = isMobile ? 0.05 : 0.1; // Less wind effect on mobile

const sparks = [];

// Resize canvas when window size changes
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Re-initialize with appropriate settings for the new screen size
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
        // Only reinit if we've crossed the mobile breakpoint
        init();
    }
});

class Spark {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * (isMobile ? 3 : 5) + 2;
        this.speedX = (Math.random() - 0.5) * speedRate;
        this.speedY = Math.random() * -speedRate;
        this.opacity = 1;
    }

    update() {
        this.x += this.speedX + (Math.random() - 0.5) * windSpeed;
        this.y += this.speedY;
        this.size *= sizeRate;
        this.opacity *= sizeRate;

        // Randomly change direction (less frequently on mobile)
        if (Math.random() < (isMobile ? 0.03 : 0.05)) {
            this.speedX = (Math.random() - 0.5) * speedRate;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(0, 255, 81, ${this.opacity})`; // Green color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    sparks.length = 0; // Clear existing sparks on reinit
    for (let i = 0; i < amount; i++) {
        const x = Math.random() * canvas.width;
        const y = canvas.height;
        sparks.push(new Spark(x, y));
    }
}

let lastTime = 0;
const fps = isMobile ? 30 : 60; // Lower FPS on mobile for performance
const fpsInterval = 1000 / fps;

function animate(timestamp) {
    const elapsed = timestamp - lastTime;
    
    if (elapsed > fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sparks.forEach((spark, index) => {
            spark.update();
            spark.draw();
            if (spark.size < 0.5 || spark.opacity < 0.1) {
                sparks.splice(index, 1);
                const x = Math.random() * canvas.width;
                const y = canvas.height;
                sparks.push(new Spark(x, y));
            }
        });
    }
    
    requestAnimationFrame(animate);
}

init();
animate(0);
