document.addEventListener('DOMContentLoaded', function () {
    const likeButton = document.getElementById('likeButton');
    const likeIcon = document.getElementById('likeIcon');
    const likeCount = document.getElementById('likeCount');
    let postId = likeButton.getAttribute('data-post-id');
    let isLiked = false;

    likeButton.addEventListener('click', function () {
        if (!isLiked) {
            // Send an AJAX request
            var xhr = new XMLHttpRequest();

            // Define the request type, URL, and data
            xhr.open('POST', '/like', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        simulateSuccessfulLike();
                    } else {
                        // Handle error
                        console.error('Failed to like.');
                    }
                }
            };

            // Send the request with the postId as JSON data
            xhr.send(JSON.stringify({ postId: postId }));
        }
    });

    function simulateSuccessfulLike() {
        // Simulating a successful like
        isLiked = true;
        likeIcon.innerHTML = '❤️'; // Change heart color (use an actual colored heart icon)
        let currentLikes = parseInt(likeCount.innerHTML, 10);
        likeCount.innerHTML = currentLikes + 1; // Update like count
    }
});
