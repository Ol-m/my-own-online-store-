const options = document.querySelectorAll('.opt-val');
const selectButton = document.getElementById('select-button');
const selectedValue = document.getElementById('selected-value');

options.forEach(option => {
    option.addEventListener('click', () => {
        const newValue = option.innerText;
        selectedValue.innerText = newValue;
        selectButton.click();
    });
});