
// Add a submit event listener to the login form
document.querySelector("form").addEventListener("submit", async (e) => {
    // Prevent default form submission (no page reload)
    e.preventDefault();

    // Get email and password values from the input fields
    const email = document.querySelector("input[type='email']").value;
    const password = document.querySelector("input[type='password']").value;

    try {
        // Send login credentials to the backend server
        const res = await fetch("http://localhost:3000/login", {
            method: "POST", // HTTP method
            headers: { "Content-Type": "application/json" }, // Sending JSON format
            body: JSON.stringify({ email, password }) // Convert login data to JSON string
        });

        // If login fails (e.g., wrong credentials), show an alert with the error message
        if (!res.ok) {
            const errorData = await res.json();
            return alert(errorData.message || "Login failed");
        }

        // If login succeeds, parse the response and alert the success message
        const data = await res.json();
        alert(data.message);

        // Redirect the user to the homepage after successful login
        window.location.href = "/homepage.html";

    } catch (err) {
        // Handle unexpected errors (e.g., server down, network error)
        alert("Unexpected error occurred.");
        console.error(err); // Log error details to the console for debugging
    }
});
