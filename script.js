const postList = document.getElementById("postList");

const fetchButton = document.getElementById("fetchButton");

function addLoader(el) {
    postList.appendChild(el);
};

function removeLoader(el) {
    postList.removeChild(el);
};

// Set event listener to load posts upon clicking button (adding it to the window enables this feature by clicking anywhere in the window)
fetchButton.addEventListener("click", function () {

    // Adding Loading Message
    let loadingMessage = document.createElement("p");
    loadingMessage.innerText = "Loading...";
    addLoader(loadingMessage);

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            setTimeout(() => removeLoader(loadingMessage), 300); // Removed loading message after a 3 second delay
            setTimeout(() => { // Renders posts with a 5 second delay
                json.forEach(item => {
                    let title = document.createElement("h2");
                    title.innerText = item.title;

                    let body = document.createElement("p");
                    body.innerText = item.body;

                    postList.appendChild(title);
                    postList.appendChild(body);
                })
            }, 500);
        })
        .catch(function (error) {
            console.error(`❌ Error fetching posts: `, error)
        });
});

const postForm = document.getElementById("postForm");

// Function to clear/reset confirmation message with each "submit" so that the confirmations don't stack on page
function removeIfExists(id) {
    const el = document.getElementById(id);
    if (el) {
        el.remove();
    }
};

postForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let formTitle = document.getElementById("titleInput"); // Refers to user input box

    let formBody = document.getElementById("bodyInput"); // Refers to user input box

    const submitForm = { // Sets up object to log in console by pulling input value
        title: formTitle.value,
        body: formBody.value
    };
    // Add Loading Message

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitForm) // Converts to JSON format
    })
        .then(function (response) {
            return response.json(); // Returns JSON object
        })
        .then(function (data) {
            console.log(data);
        })
        .then(function (data) {
            removeIfExists("confirmation-message")
            // setTimeout(() => removeLoader(postForm, loadingMessage), 300);
            const confirmation = document.createElement("p");
            confirmation.id = "confirmation-message"
            confirmation.innerHTML = `✅ Post sumbitted! <br> <br> "<strong>${formTitle.value}</strong>: ${formBody.value}"`;
            postForm.appendChild(confirmation);
            formTitle.value = ''; // Resets user input field
            formBody.value = ''; // Resets user input field
        })
        .catch(function (error) {
            console.error(`❌ Error submitting your post: `, error);
        })
});

