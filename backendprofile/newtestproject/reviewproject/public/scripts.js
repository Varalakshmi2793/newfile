document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    const searchInput = document.getElementById('searchInput');
    const reviewsList = document.getElementById('reviewsList');
    const averageRating = document.getElementById('averageRating');
    const ratingStars = document.querySelectorAll('.star');
    const ratingValue = document.getElementById('ratingValue');
  
    // Event listener for the form submission
    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = new FormData(reviewForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
  
      try {
        const response = await fetch('/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error('Failed to add review');
        }
  
        // Clear form fields after successful submission
        reviewForm.reset();
  
        // Reload reviews after submission
        await loadReviews();
      } catch (error) {
        console.error('Error submitting review:', error);
        // Handle error, show message to the user, etc.
      }
    });
  
    // Event listener for star ratings
    ratingStars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-rating'));
        ratingValue.value = rating;
        highlightStars(rating);
      });
    });
  
    // Event listener for search input
    searchInput.addEventListener('input', async () => {
      await loadReviews();
    });
  
    async function loadReviews() {
      const searchTerm = searchInput.value.trim();
  
      try {
        const response = await fetch(`/search?companyName=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
  
        const { reviews, averageRating: avgRating } = await response.json();
  
        // Display average rating in number form
        averageRating.textContent = `Average Rating: ${avgRating.toFixed(2)}`;
  
        displayStarRating(avgRating);
  
        reviewsList.innerHTML = '';
        reviews.forEach((review) => {
          const li = document.createElement('li');
          li.textContent = `${review.companyName}: Pros - ${review.pros}, Cons - ${review.cons}, Rating - ${review.rating}`;
          reviewsList.appendChild(li);
        });
      } catch (error) {
        console.error('Error loading reviews:', error);

      }
    }
  
    function highlightStars(selectedRating) {
      ratingStars.forEach(star => {
        const rating = parseInt(star.getAttribute('data-rating'));
        if (rating <= selectedRating) {
          star.textContent = '★';
        } else {
          star.textContent = '☆';
        }
      });
    }
  
    function displayStarRating(avgRating) {
      const roundedAvgRating = Math.round(avgRating);
      ratingStars.forEach(star => {
        const rating = parseInt(star.getAttribute('data-rating'));
        if (rating <= roundedAvgRating) {
          star.textContent = '★';
        } else {
          star.textContent = '☆';
        }
      });
    }
  
    loadReviews();
  });
  