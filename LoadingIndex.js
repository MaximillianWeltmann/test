(function() {
    // Check if localStorage is available
    function isLocalStorageAvailable() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    }
    
    // Function to detect if device is mobile/tablet for faster loading
    function isMobileOrTablet() {
        return window.innerWidth <= 991;
    }

    // Adjust loading time based on device
    const fastLoading = isMobileOrTablet();
    
    // Redirect logic
    if (isLocalStorageAvailable()) {
        // Don't redirect if coming back from another page
        if (document.referrer && document.referrer.includes(window.location.hostname)) {
            // User is navigating within the site, no need to redirect
            localStorage.setItem('redirected', 'true');
        } else if (!localStorage.getItem('redirected')) {
            localStorage.setItem('redirected', 'true'); // Mark as redirected
            
            // Use shorter load time for mobile devices
            if (fastLoading) {
                localStorage.setItem('fastLoading', 'true');
            }
            
            window.location.href = "loading.html"; // Redirect to loading page
        }

        // Clear redirect state when page is closed/refreshed
        window.addEventListener('beforeunload', function() {
            localStorage.removeItem('redirected');
            localStorage.removeItem('fastLoading');
        });
    }
})();