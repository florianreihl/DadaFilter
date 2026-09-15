function removeBlacklistedWords(commentBody) {
    const walker = document.createTreeWalker(
        commentBody,
        NodeFilter.SHOW_TEXT
    );

    while (walker.nextNode()) {
        const node = walker.currentNode;

        BLACKLISTED_WORDS.forEach((word) => {
            const regex = new RegExp(escapeRegex(word), "gi");
            node.nodeValue = node.nodeValue.replace(regex, "");
        });
    }
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}