// Optimized loading animation with device-specific timing
window.onload = function () {
    // Check if running on mobile/tablet for faster loading
    const fastLoading = localStorage.getItem('fastLoading') === 'true' || window.innerWidth <= 991;
    
    // Adjust animation based on device type
    const animationDuration = fastLoading ? 600 : 1000; // Faster on mobile
    const totalRotations = fastLoading ? 2 : 3; // Fewer rotations on mobile
    
    // Add a listener for visibility changes to pause/resume the animation
    let redirectTimeout;
    
    function startRedirectTimer() {
        // Clear any existing timeout
        if (redirectTimeout) {
            clearTimeout(redirectTimeout);
        }
        
        // Set new timeout to redirect after animation completes
        redirectTimeout = setTimeout(function () {
            redirectToMainPage();
        }, animationDuration * totalRotations);
    }
    
    function redirectToMainPage() {
        window.location.href = "index.html";
    }
    
    // Handle page visibility changes (when user switches tabs)
    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            // Clear timeout when tab is not visible
            clearTimeout(redirectTimeout);
        } else {
            // Restart timer when tab is visible again
            startRedirectTimer();
        }
    });
    
    // Start the redirect timer
    startRedirectTimer();
    
    // Add option to skip loading animation
    document.addEventListener('click', function() {
        redirectToMainPage();
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
            redirectToMainPage();
        }
    });
};
