const filterLevelSelect = document.getElementById("filterLevel");

chrome.storage.sync.get(
    {
        filterLevel: "soft"
    },
    (settings) => {
        filterLevelSelect.value = settings.filterLevel;
    }
);

filterLevelSelect.addEventListener("change", () => {
    chrome.storage.sync.set({
        filterLevel: filterLevelSelect.value
    });
});