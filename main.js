const numStars = 150;

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');

  star.style.left = `${Math.random() * 100}vw`;
  star.style.top = `${Math.random() * -100}vh`; // Start stars above the viewport
  star.style.animationDuration = `${Math.random() * 5 + 2}s`;
  star.style.animationDelay = `${Math.random() * 10}s`;

  document.body.appendChild(star);

  // Remove star after animation ends to avoid memory leaks
  setTimeout(() => {
    document.body.removeChild(star);
    requestAnimationFrame(createStar); // Continuously create new stars to keep the effect seamless
  }, (parseFloat(star.style.animationDuration) + parseFloat(star.style.animationDelay)) * 1000);
}

for (let i = 0; i < numStars; i++) {
  createStar();
}
