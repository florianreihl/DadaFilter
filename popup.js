const filterLevelSelect = document.getElementById("filterLevel");
const wordInput = document.getElementById("wordInput");
const addWordButton = document.getElementById("addWordButton");
const wordList = document.getElementById("wordList");

chrome.storage.sync.get(
    {
        filterLevel: "soft",
        blacklistedWords: DEFAULT_BLACKLISTED_WORDS
    },
    (settings) => {
        filterLevelSelect.value = settings.filterLevel;
        renderWordList(settings.blacklistedWords);
    }
);

filterLevelSelect.addEventListener("change", () => {
    chrome.storage.sync.set({
        filterLevel: filterLevelSelect.value
    });
});

addWordButton.addEventListener("click", addWord);

wordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addWord();
    }
});

function addWord() {
    const word = wordInput.value.trim().toLowerCase();

    if (!word) {
        return;
    }

    chrome.storage.sync.get(
        { blacklistedWords: DEFAULT_BLACKLISTED_WORDS },
        (settings) => {
            if (settings.blacklistedWords.includes(word)) {
                wordInput.value = "";
                return;
            }

            const updated = [...settings.blacklistedWords, word];

            chrome.storage.sync.set({ blacklistedWords: updated }, () => {
                renderWordList(updated);
                wordInput.value = "";
                wordInput.focus();
            });
        }
    );
}

function removeWord(word) {
    chrome.storage.sync.get(
        { blacklistedWords: DEFAULT_BLACKLISTED_WORDS },
        (settings) => {
            const updated = settings.blacklistedWords.filter((w) => w !== word);

            chrome.storage.sync.set({ blacklistedWords: updated }, () => {
                renderWordList(updated);
            });
        }
    );
}

function renderWordList(words) {
    wordList.innerHTML = "";

    words.forEach((word) => {
        const li = document.createElement("li");

        const label = document.createElement("span");
        label.textContent = word;

        const removeButton = document.createElement("button");
        removeButton.textContent = "\u00d7";
        removeButton.className = "removeWordButton";
        removeButton.title = `Remove "${word}"`;
        removeButton.addEventListener("click", () => removeWord(word));

        li.appendChild(label);
        li.appendChild(removeButton);
        wordList.appendChild(li);
    });

    if (words.length === 0) {
        const empty = document.createElement("li");
        empty.className = "emptyState";
        empty.textContent = "No words — filter won't match anything.";
        wordList.appendChild(empty);
    }
}