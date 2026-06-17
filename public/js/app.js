// Check Login
const user = JSON.parse(
    localStorage.getItem("user")
);

if (!user) {

    window.location.href =
        "login.html";

}

// Show Username

document.addEventListener("DOMContentLoaded", () => {

    const usernameElement =
        document.getElementById("username");

    if (usernameElement && user) {
        usernameElement.innerText =
            user.username;
    }

    const settingsForm = document.getElementById("settingsForm");
    if (settingsForm) {
        settingsForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const newUsername = document.getElementById("settingsUsername").value;
            const newEmail = document.getElementById("settingsEmail").value;
            
            if (newUsername) {
                user.username = newUsername;
            }
            if (newEmail) {
                user.email = newEmail;
            }
            
            localStorage.setItem("user", JSON.stringify(user));
            document.getElementById("username").innerText = user.username;
            const profileName = document.getElementById("profileName");
            if (profileName) {
                profileName.innerText = user.username;
            }
            
            closeSettings();
            alert("Settings updated successfully!");
        });
    }

    loadPosts();
});

// Create Post

async function createPost() {

    const content =
    document.getElementById("postContent").value;

    const image =
    document.getElementById("postImage");

    let imageUrl = "";

    if(image && image.files && image.files.length > 0){

        imageUrl =
        URL.createObjectURL(image.files[0]);

    }

    const response = await fetch(
        "http://localhost:5000/api/posts",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                user:user._id,
                content:content,
                image:imageUrl
            })
        }
    );

    loadPosts();
}

// Load Posts

async function loadPosts() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/posts"
        );

        const posts =
            await response.json();

        const container =
            document.getElementById(
                "postsContainer"
            );

        container.innerHTML = "";

        posts.forEach(post => {

            container.innerHTML += `

            <div class="post-card">

                <div class="post-header">
<img src="https://picsum.photos/50">
                    <div>
                        <h4>
                            ${post.user?.username || "Unknown User"}
                        </h4>

                        <small>
                            ${new Date(
                                post.createdAt
                            ).toLocaleString()}
                        </small>
                    </div>

                </div>

                <p>${post.content}</p>

              <div class="post-actions">

    <button onclick="likePost('${post._id}')">
        ❤️ ${post.likes ? post.likes.length : 0}
    </button>

    <button onclick="commentPost('${post._id}')">
        💬 Comment
    </button>

    <button onclick="sharePost('${post._id}')">
        🔗 Share
    </button>

</div>

<div class="comments">

${post.comments && post.comments.length > 0
? post.comments.map(comment => `
    <p>
        <b>${comment.user?.username || "User"}:</b>
        ${comment.text}
    </p>
`).join("")
: ""}

</div>

            </div>

            `;

        });

    } catch (error) {

        console.error(error);

    }
}

// Logout

function logout() {

    localStorage.removeItem("user");

    window.location.href =
        "login.html";
}
// Like Post

async function likePost(postId) {

    const response = await fetch(
        `http://localhost:5000/api/posts/like/${postId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: user._id
            })
        }
    );

    loadPosts();
}

// Comment Post

let currentPostIdForComment = null;

async function commentPost(postId) {
    currentPostIdForComment = postId;
    const modal = document.getElementById("commentModal");
    const commentInput = document.getElementById("commentText");
    commentInput.value = "";
    modal.style.display = "flex";
}

function closeCommentModal() {
    document.getElementById("commentModal").style.display = "none";
}

async function submitComment() {
    const text = document.getElementById("commentText").value.trim();
    
    if (!text) {
        alert("Comment cannot be empty");
        return;
    }

    await fetch(
        `http://localhost:5000/api/posts/comment/${currentPostIdForComment}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: user._id,
                text: text
            })
        }
    );

    alert("Comment Added");
    closeCommentModal();
    loadPosts();
}

// Share Post

function sharePost(postId) {

    const url =
        `${window.location.origin}/post/${postId}`;

    navigator.clipboard.writeText(url);

    alert("Post link copied!");
}

// Settings

function openSettings() {
    const modal = document.getElementById("settingsModal");
    document.getElementById("settingsUsername").value = user.username;
    document.getElementById("settingsEmail").value = user.email;
    modal.style.display = "flex";
}

function closeSettings() {
    document.getElementById("settingsModal").style.display = "none";
}