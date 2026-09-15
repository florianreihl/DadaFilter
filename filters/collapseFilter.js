function collapseComment(comment) {
    const summary = comment.querySelector("summary");

    if (!summary) {
        return;
    }

    const details = summary.closest("details");

    if (details && details.open) {
        summary.click();
    }
}