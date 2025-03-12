document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const contactForm = document.getElementById('contact-form');
    const statusMessage = document.getElementById('status-message');
    
    console.log('Contact form script loaded');
    
    if (contactForm) {
        console.log('Contact form found');
        
        // Add specific handling for mobile devices
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            // Adjust form elements for better mobile experience
            const textArea = document.getElementById('message');
            if (textArea) {
                textArea.rows = 6; // Reduce height on mobile
            }
        }
        
        // Form submission handler
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Form submitted');
            
            // Show loading message
            statusMessage.textContent = 'Sending...';
            statusMessage.style.color = 'var(--main-color)';
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            console.log('Form data:', formData);
            
            // Verify EmailJS initialization
            if (typeof emailjs === 'undefined') {
                handleError(new Error('Email service not available. Please try again later.'));
                return;
            }
            
            console.log('EmailJS ready:', typeof emailjs !== 'undefined');
            
            // Parameters for debugging
            const serviceID = 'service_wkemxgr';
            const templateID = 'template_0z0nqmj';
            
            console.log('Sending email with:', {
                serviceID: serviceID,
                templateID: templateID
            });
            
            // Add timeout for slow connections
            const emailTimeout = setTimeout(() => {
                handleError(new Error('Request timed out. Please check your internet connection and try again.'));
            }, 15000); // 15 second timeout
            
            // Send the email using EmailJS
            emailjs.send(
                serviceID,
                templateID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    from_phone: formData.phone,
                    subject: formData.subject,
                    message: formData.message
                }
            )
            .then(function(response) {
                // Clear timeout
                clearTimeout(emailTimeout);
                
                // Success
                console.log('Email sent successfully:', response);
                statusMessage.textContent = 'Message sent successfully!';
                statusMessage.style.color = 'var(--main-color)';
                
                // Reset the form
                contactForm.reset();
                
                // Clear the success message after a few seconds
                setTimeout(function() {
                    statusMessage.textContent = '';
                }, 5000);
            })
            .catch(function(error) {
                // Clear timeout
                clearTimeout(emailTimeout);
                
                // Error
                handleError(error);
            });
        });
        
        // Error handler function
        function handleError(error) {
            console.error('Error sending email:', error);
            statusMessage.textContent = 'Failed to send message. Please try again. Error: ' + 
                (error.text || error.message || 'Unknown error');
            statusMessage.style.color = 'red';
            
            // Clear error message after 10 seconds
            setTimeout(function() {
                statusMessage.textContent = '';
            }, 10000);
        }
    } else {
        console.error('Contact form not found');
    }
    
    // Add window resize handler to adjust for responsive changes
    window.addEventListener('resize', function() {
        const textArea = document.getElementById('message');
        if (textArea) {
            // Adjust rows based on screen width
            textArea.rows = window.innerWidth <= 768 ? 6 : 10;
        }
    });
}); 