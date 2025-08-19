// Get all elements with the class "productInfoSizesSize"
const sizeButtons = document.querySelectorAll('.productInfoSizesSize');

// Add a click event listener to each button
sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove the "active" class from all buttons
        sizeButtons.forEach(btn => btn.classList.remove('active'));
        // Add the "active" class to the clicked button
        button.classList.add('active');
    });
});
