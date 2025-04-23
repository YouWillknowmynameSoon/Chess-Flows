// Load the Google OAuth API
function renderGoogleButton() {
  gapi.load('auth2', function() {
    gapi.auth2.init({
      client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com', // Replace with your client ID
    }).then(function() {
      gapi.signin2.render('google-signin-button', {
        'scope': 'profile email',
        'longtitle': true, // Use a long button title
        'theme': 'dark', // Use a dark theme for the button
        'onsuccess': onSignIn, // This function gets triggered after a successful sign-in
      });
    });
  });
}

// This function handles the success of the Google Sign-In
function onSignIn(googleUser) {
  const idToken = googleUser.getAuthResponse().id_token;
  const profile = googleUser.getBasicProfile();
  const userName = profile.getName();
  const userEmail = profile.getEmail();

  console.log('User signed in: ' + userName);
  console.log('User email: ' + userEmail);

  // Send the ID token to your server to authenticate the user
  fetch('/auth/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: idToken })
  })
  .then(response => response.json())
  .then(data => {
    console.log('User authenticated successfully', data);
    // Optionally, you could redirect the user or update the UI here
  })
  .catch(error => {
    console.error('Error during Google authentication:', error);
  });
}

// This function initializes the Google Sign-In button on page load
document.addEventListener('DOMContentLoaded', function() {
  renderGoogleButton();
});
