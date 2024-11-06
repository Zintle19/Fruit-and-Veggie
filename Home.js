// Simple carousel functionality for featured products
// Selecting the carousel track and items
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

// Function to show the current item
function showCurrentItem() {
    const itemWidth = items[0].clientWidth + 20; // Include margin in width calculation
    track.style.transform = `translateX(${-currentIndex * itemWidth}px)`; // Slide the track
}

// Function to move to the next item
function nextItem() {
    currentIndex = (currentIndex + 1) % items.length; // Loop back to the start when at the end
    showCurrentItem();
}

// Start the carousel sliding, changing every 3 seconds
setInterval(nextItem, 3000);

// Adjust carousel position when window is resized
window.addEventListener('resize', showCurrentItem);

console.log(document.querySelector('.carousel-track'));
console.log(document.querySelectorAll('.carousel-item'));


// ----------------------------------------------------------
// Customer reviews carousel

console.log(document.querySelectorAll('.review-item'));
console.log(document.getElementById('delivery-modal'));
console.log(document.querySelector('.btn3'));
console.log(document.querySelector('.close'));


const reviews = document.querySelectorAll('.review-item');
let reviewIndex = 0;

function showCurrentReview() {
    reviews.forEach((review, index) => {
        review.classList.toggle('active', index === reviewIndex);
    });
}

function nextReview() {
    reviewIndex = (reviewIndex + 1) % reviews.length;
    showCurrentReview();
}

setInterval(nextReview, 4000); // Change review every 4 seconds
showCurrentReview();

// Get the modal
const modal = document.getElementById('delivery-modal');

// Get the button that opens the modal
const learnMoreBtn = document.querySelector('.btn3');

// Get the <span> element that closes the modal
const closeModal = document.querySelector('.close');

// When the user clicks the button, open the modal 
learnMoreBtn.addEventListener('click', function(event) {
    event.preventDefault();
    modal.style.display = 'flex'; // Show modal
});

// When the user clicks on <span> (x), close the modal
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});


