/* ========================================= SIDEBAR ========================================= */

var menuicon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");

if (menuicon && sidebar && container) {

    menuicon.onclick = function () {

        sidebar.classList.toggle("small-sidebar");
        container.classList.toggle("large-container");

    };
}
/* ----------------------LIKE BUTTON------------------------------------- */

var likeBtn = document.getElementById("likeBtn");
var dislikeBtn = document.getElementById("dislikeBtn");

var likeCount = document.getElementById("likeCount");
var dislikeCount = document.getElementById("dislikeCount");
if (likeBtn && dislikeBtn) {
    likeBtn.addEventListener("click", function () {
        var likes = parseInt(likeCount.textContent);
        var dislikes = parseInt(dislikeCount.textContent);
        /* If already liked, remove like */
        if (likeBtn.classList.contains("active")) {

            likes--;

            likeBtn.classList.remove("active");

        }
        /* Otherwise add like */
        else {

            likes++;

            likeBtn.classList.add("active");

            /* Remove dislike if it was selected */

            if (dislikeBtn.classList.contains("active")) {

                dislikes--;

                dislikeBtn.classList.remove("active");

            }

        }
        likeCount.textContent = likes;
        dislikeCount.textContent = dislikes;

    });
/* =========================================DISLIKE BUTTON ========================================= */

    dislikeBtn.addEventListener("click", function () {

        var likes = parseInt(likeCount.textContent);
        var dislikes = parseInt(dislikeCount.textContent);
        /* If already disliked, remove dislike */
        if (dislikeBtn.classList.contains("active")) {

            dislikes--;
            dislikeBtn.classList.remove("active");
        }
        /* Otherwise add dislike */
        else {
            dislikes++;
            dislikeBtn.classList.add("active");
            /* Remove like if selected */
            if (likeBtn.classList.contains("active")) {
                likes--;
                likeBtn.classList.remove("active");
            }
        }
        likeCount.textContent = likes;
        dislikeCount.textContent = dislikes;
    });
}
/* ========================================= SUBSCRIBE BUTTON ========================================= */
var subscribeBtn = document.getElementById("subscribeBtn");
if (subscribeBtn) {
    subscribeBtn.addEventListener("click", function () {
        if (subscribeBtn.classList.contains("subscribed")) {

            subscribeBtn.classList.remove("subscribed");
            subscribeBtn.textContent = "Subscribe";

        }
        else {
            subscribeBtn.classList.add("subscribed");
            subscribeBtn.textContent = "Subscribed";
        }
    });
}
/* ========================================= SAVE BUTTON ========================================= */
var saveBtn = document.getElementById("saveBtn");
var saveText = document.getElementById("saveText");
if (saveBtn) {

    saveBtn.addEventListener("click", function () {

        if (saveBtn.classList.contains("active")) {

            saveBtn.classList.remove("active");

            saveText.textContent = "Save";
        }
        else {

            saveBtn.classList.add("active");

            saveText.textContent = "Saved";
        }
    });
}
/* --------------------------------SHARE BUTTON -------------------------------*/
var shareBtn = document.getElementById("shareBtn");
if (shareBtn) {
    shareBtn.addEventListener("click", async function () {
        var videoUrl = window.location.href;
        /* Modern browser sharing */

        if (navigator.share) {

            try {
                await navigator.share({
                    title: "Best channel to learn Python",
                    text: "Check out this video!",
                    url: videoUrl
                });

            }

            catch (error) {

                console.log("Share cancelled");

            }

        }
        /* If browser does not support share */

        else {
            try {

                await navigator.clipboard.writeText(videoUrl);

                alert("Video link copied to clipboard!");

            }
            catch (error) {
                alert("Unable to copy the link.");
            }
        }
    });
}
/* --------------------------------- COMMENTS ------------------------- */
var commentBtn = document.getElementById("commentBtn");
var commentInput = document.getElementById("commentInput");
var commentCount = document.getElementById("commentCount");
if (commentBtn && commentInput) {

    commentBtn.addEventListener("click", function () {

        var commentText = commentInput.value.trim();


        /* Don't add empty comments */

        if (commentText === "") {

            return;

        }
        /* Create comment */
        var comment = document.createElement("div");
        comment.className = "old-comment";
        comment.innerHTML = `
            <img src="images/profile.png">
            <div>

                <h3>
                    You
                    <span>Just now</span>
                </h3>

                <p>${commentText}</p>

                <div class="acomment-action">

                    <button class="comment-like">
                        <img src="images/like.png">
                        <span>0</span>
                    </button>

                    <button class="comment-dislike">
                        <img src="images/dislike.png">
                        <span>0</span>
                    </button>
                    <button class="reply-btn">
                        Reply
                    </button>
                </div>
            </div>
        `;
        /* Add comment to page */
        var description = document.querySelector(".vid-description");
        description.appendChild(comment);

        /* Increase comment count */

        var count = parseInt(commentCount.textContent);

        commentCount.textContent = count + 1;


        /* Clear input */

        commentInput.value = "";

    });
}
/* ------------------------ENTER KEY FOR COMMENT ------------------------------*/
if (commentInput) {

    commentInput.addEventListener("keypress", function (event) {

        if (event.key === "Enter") {

            commentBtn.click();

        }
    });
}
/* ----------------------------- COMMENT LIKE BUTTON -------------------------------------- */
document.addEventListener("click", function (event) {

    var button = event.target.closest(".comment-like");

    if (!button) {
        return;
    }
    var countElement = button.querySelector("span");
    var count = parseInt(countElement.textContent);
    if (button.classList.contains("active")) {
        count--;
        button.classList.remove("active");

    }

    else {

        count++;
        button.classList.add("active");

    }
    countElement.textContent = count;
});

/* ----------------------------------- COMMENT DISLIKE BUTTONS --------------- */

document.addEventListener("click", function (event) {

    var button = event.target.closest(".comment-dislike");

    if (!button) {
        return;
    }

    var countElement = button.querySelector("span");

    var count = parseInt(countElement.textContent);


    if (button.classList.contains("active")) {
        count--;
        button.classList.remove("active");
    }

    else {
        count++;
        button.classList.add("active");

    }

    countElement.textContent = count;
});
/* ----------------------REPLY BUTTON --------------------------------------------- */

document.addEventListener("click", function (event) {

    var button = event.target.closest(".reply-btn");
    if (!button) {
        return;
    }
    var comment = button.closest(".old-comment");
    var input = document.getElementById("commentInput");
    if (input) {
        input.focus();
        input.placeholder = "Reply to this comment...";
    }
});