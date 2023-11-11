const images = document.getElementsByClassName('card-item');
for (let i = 0; i <= images.length - 1; i++) {
  images[i].addEventListener('mouseover', () => {
    for (let j = 0; j < images.length; j++) {
      images[j].classList.add('passiveimage');
    }
    (function () {
      images[i].classList.remove('passiveimage');
    })();
    images[i].addEventListener('mouseout', () => {
      for (let j = 0; j < images.length; j++) {
        images[j].classList.remove('passiveimage');
      }
    });
  });
}

// const items = document.querySelector('.card-list');
// const elements = items.querySelectorAll('li');
// // function mouseHover(params) {}
// items.addEventListener('click', event => {
//   const clickedElement = event.target;
//   // Iterate over all elements
//   for (let i = 0; i < elements.length; i++) {
//     // If the element is not the clicked element
//     if (elements[i] !== clickedElement) {
//       // Add the class to the element
//       elements[i].classList.add('passiveimage');
//     } else {
//       elements[i].classList.remove('passiveimage');
//     }
//   }
// });
