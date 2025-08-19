document.addEventListener("DOMContentLoaded", function () {
    const selectButton = document.getElementById("select-button");
    const optionsViewButton = document.getElementById("options-view-button");
    const options = document.getElementById("options");

    selectButton.addEventListener("click", function () {
        optionsViewButton.checked = !optionsViewButton.checked;
        if (!optionsViewButton.checked) {
            // Reset the selected value when closing the dropdown
            const selectedValue = document.getElementById("selected-value");
            selectedValue.innerHTML = '<span>Select a Language</span>';
        }
    });

    options.addEventListener("click", function (event) {
        const selectedValue = document.getElementById("selected-value");
        if (event.target.tagName === "INPUT") {
            selectedValue.innerHTML = event.target.value;
            optionsViewButton.checked = false;
        }
    });
});
