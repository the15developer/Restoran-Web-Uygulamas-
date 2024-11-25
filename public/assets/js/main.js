
window.onscroll = function() {scrollFunction()};

var elements = document.getElementsByClassName('color_change');
var upButton = document.getElementById('upbutton');


function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) { //kullanici sayfayi en az 20 pixel kadar asagiya kaydirdi mi ? 
    document.getElementById("container1").style.top = "-30px";
    upButton.classList.add('show');

    for (var i = 0; i < elements.length; i++) {
        
        elements[i].classList.remove('bg-red');
      
       
        elements[i].classList.add('bg-red-opaque');
      }
    
  } else {
    document.getElementById("container1").style.top = "0px";
    upButton.classList.remove('show');

    for (var i = 0; i < elements.length; i++) {
      
        elements[i].classList.remove('bg-red-opaque');
      
       
        elements[i].classList.add('bg-red');
      }
    
  }
}



document.getElementById('content1').style.display = "block";

document.getElementById('content1').classList.add('active');

function showContent(contentId) {
 
  var contents = document.getElementsByClassName("content");
  for (var i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
    contents[i].classList.remove('active');
  }

  document.getElementById(contentId).style.display = "block";
  document.getElementById(contentId).classList.add('active');

  var rakam = parseInt(contentId[8]);

  document.getElementById("menu"+rakam.toString).style.color="white";
}

function openReservation() {
  var dialog = document.getElementById('dialog');
  dialog.style.display="block";
}

// Function to close the dialog
function closeReservation() {
  var dialog = document.getElementById('dialog');
  dialog.close();
  dialog.style.display="none";
}

function openLogin() {
  var dialog = document.getElementById('login');
  dialog.style.display="block";
}


function openLogin2() {
  var dialog = document.getElementById('login2');
  dialog.style.display="block";
}

function closeLogin() {
  var dialog = document.getElementById('login');
  dialog.close();
  dialog.style.display="none";
}

function closeLogin2() {
  var dialog = document.getElementById('login2');
  dialog.close();
  dialog.style.display="none";
}


function openNewAccount() {
  closeLogin();
  var dialog = document.getElementById('newAccount');
  dialog.style.display="block";
  
}

function closeNewAccount() {
  var dialog = document.getElementById('newAccount');
  dialog.close();
  dialog.style.display="none";
}


// document.addEventListener('DOMContentLoaded', function() {
//       // Your code here
//       console.log('firstOK');
   

// // Attach event listener to the form submission event
// document.querySelector('#form1').addEventListener('submit', function(event) {
  
//   // Prevent the default form submission behavior
//   event.preventDefault();

//   console.log('Started');

//   // Serialize the form data
//   const formData = new FormData(this);

//   // Send an AJAX POST request
//   const request = new XMLHttpRequest();
//   request.open('post', '/submitReservation');
//   request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//   request.onload = function() {
//     if (request.status === 200) {
//       // Handle the success response from the server
//       // Update the DOM to display the success message box
//       console.log("OK");
//       const successBox = document.createElement('div');
//       successBox.textContent = 'Reservation made successfully.';

//       const closeButton = document.createElement('button');
//       closeButton.textContent = 'Close';
//       closeButton.addEventListener('click', function() {
//         // Hide the success message box when the close button is clicked
//         successBox.style.display = 'none';
//       });

//       successBox.appendChild(closeButton);
//       document.body.appendChild(successBox);
//     } else {
//       // Handle the error response from the server
//       console.error('Error submitting reservation:', request.status);
//     }
//   };

//   request.onerror = function() {
//     // Handle any network errors
//     console.error('Network error occurred');
//   };

//   request.send(new URLSearchParams(formData));
// });


// });


document.addEventListener('DOMContentLoaded', function() {
  console.log("OKKK");
  const urlParams = new URLSearchParams(window.location.search);
  const reservationSuccess = urlParams.get('reservationSuccess');

  if (reservationSuccess === 'true') {
    // Reservation success message box
    const successBox = document.createElement('div');
    successBox.textContent = 'Reservation made successfully.';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', function() {
      // Hide the success message box when the close button is clicked
      successBox.style.display = 'none';
    });

    successBox.appendChild(closeButton);
    document.body.appendChild(successBox);
  }
});


function updateLoginLogoutButton() {
  const logButton = document.getElementById('authLink');

  // Check if the user is authenticated
  const authToken = localStorage.getItem('authToken');
  const username = localStorage.getItem('username');

  if (authToken && username) {
    // User is authenticated, update the button to "Logout, [username]"
    logButton.textContent = `Logout, ${username}`;
    logButton.addEventListener('click', handleLogout);
  } else {
    // User is not authenticated, update the button to "Login"
    logButton.textContent = 'login';
    logButton.addEventListener('click', openLogin);
  }
}


function handleLogout() {
  // Remove the token and username from localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('username');

  // Update the login/logout button
  const loginButton = document.getElementById('authLink');
  loginButton.textContent = `login`;
  loginButton.addEventListener('click', openLogin);
  
}


function handleLogout2() {

  const authToken = localStorage.getItem('authToken');
  const username = localStorage.getItem('username');
  // Remove the token and username from localStorage

  if (authToken && username) {
    // User is authenticated, update the button to "Logout, [username]"
  localStorage.removeItem('authToken');
  localStorage.removeItem('username');
  console.log('Cikis yapildi');
  }

  else{
    console.log('Once giris yapin !');
  }
  
}



