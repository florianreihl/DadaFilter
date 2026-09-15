function filterComments() {
    chrome.storage.sync.get(
        {
            filterLevel: "soft",
            blacklistedWords: DEFAULT_BLACKLISTED_WORDS
        },
        (settings) => {
            if (settings.filterLevel === "off" || settings.blacklistedWords.length === 0) {
                return;
            }

            const comments =
                document.querySelectorAll("shreddit-comment, .comment");

            comments.forEach((comment) => {
                if (comment.dataset.dadaFiltered === "true") {
                    return;
                }

                const body = getCommentBody(comment);
                const text = body.textContent.toLowerCase();

                const blocked = settings.blacklistedWords.some((word) =>
                    text.includes(word.toLowerCase())
                );

                if (!blocked) {
                    return;
                }

                switch (settings.filterLevel) {
                    case "strict":
                        removeComment(comment);
                        break;

                    case "soft":
                        removeBlacklistedWords(body, settings.blacklistedWords);
                        break;

                    case "collapsed":
                        collapseComment(comment);
                        break;
                }

                comment.dataset.dadaFiltered = "true";
            });
        }
    );
}


filterComments();


const observer = new MutationObserver(() => {
    filterComments();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});


chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "sync" || (!changes.filterLevel && !changes.blacklistedWords)) {
        return;
    }

    const isPostPage = window.location.pathname.includes("/comments/");

    if (isPostPage) {
        sessionStorage.setItem("dadaScrollY", window.scrollY);
        location.reload();
    }
});


window.addEventListener("load", () => {
    const savedScrollY = sessionStorage.getItem("dadaScrollY");

    if (savedScrollY !== null) {
        window.scrollTo(0, Number(savedScrollY));
        sessionStorage.removeItem("dadaScrollY");
    }
});