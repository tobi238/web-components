var newCounter = document.createElement('counter-element');
// Add it to the page
document.body.appendChild(newCounter);
// Attach event listeners
document.querySelector('counter-element').addEventListener('open', function () {
    console.log('open');
});
//# sourceMappingURL=main.js.map