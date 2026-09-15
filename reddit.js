function getCommentBody(comment) {
    const thingId = comment.getAttribute("thingid");

    if (!thingId) {
        return comment;
    }

    return document.getElementById(
        `${thingId}-comment-rtjson-content`
    ) || comment;
}