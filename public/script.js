
// Attach a submit event listener to the signup form
document.getElementById("signupForm").addEventListener("submit", async function (e) {
  // Prevent default form submission behavior (page reload)
  e.preventDefault();

  // Get form field values and trim unnecessary spaces
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const repeatPassword = document.getElementById("repeatPassword").value;

  // Validate phone number (must be exactly 10 digits)
  if (!/^\d{10}$/.test(phone)) {
    alert("Phone number must be 10 digits.");
    return; // Stop submission
  }

  // Validate that passwords match
  if (password !== repeatPassword) {
    alert("Passwords do not match.");
    return; // Stop submission
  }

  // Create a user object to be sent to the server
  const user = { name, phone, email, password };

  try {
    // Send user data to the backend API using Fetch API
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST", // HTTP method
      headers: { "Content-Type": "application/json" }, // Sending JSON data
      body: JSON.stringify(user) // Convert JS object to JSON string
    });

    // Parse JSON response from server
    const data = await response.json();

    // Show server message as alert (success or error)
    alert(data.message);

    // If signup is successful (HTTP 201 Created)
    if (response.status === 201) {
      // Reset the form fields
      document.getElementById("signupForm").reset();

      // Redirect user to login page
      window.location.href = "/login.html";
    }

  } catch (error) {
    // Catch and handle any network/server errors
    alert("Error signing up. Please try again.");
  }
});
