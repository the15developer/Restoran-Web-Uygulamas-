
const form_register = document.getElementById('registration-form');

form_register.addEventListener('submit', async (event) => {
  
  event.preventDefault();
  console.log("R form Submitted");

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  console.log(username);
  console.log(password);

  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password}),
    });

    console.log('the request was made');

    const data = await response.json();

    if (response.ok) {
    
      console.log('the request was made and it received an OK response - which means that the user was registered succesfully');
      console.log(data.message);

      const successMessage = document.createElement('div');
      successMessage.textContent = 'Hesabiniz olusturulmustur!';
      successMessage.classList.add('success-message');
      const closeButton = document.createElement('button');

      closeButton.textContent = 'Close';
      closeButton.addEventListener('click', () => {
      successMessage.remove();
      form_register.reset();
  });

      successMessage.appendChild(closeButton);
      
      document.body.appendChild(successMessage);

    } else if(response.status === 400){

      const errorMessage = document.createElement('div');
      errorMessage.textContent = 'Kullanici adi zaten mevcuttur!';
      errorMessage.classList.add('error-message');
      const closeButton = document.createElement('button');

      closeButton.textContent = 'Close';
      closeButton.addEventListener('click', () => {
      errorMessage.remove();
      form_register.reset();
  });

      errorMessage.appendChild(closeButton);
      
      document.body.appendChild(errorMessage);

      
      console.log('Error : either the user already exists, or there was an other error during registartion');
      console.error(data.error);
      
    }

  } catch (error) {
    console.error('Error: the post request for the user registration form could not be made', error);
   
  }
});


const form_login=document.getElementById('login-form');
const loginDialog=document.getElementById('login');

form_login.addEventListener('submit', async (event) => {
  
  event.preventDefault();
  console.log("L form Submitted");

  const username_l = document.getElementById('username_l').value;
  const password_l = document.getElementById('password_l').value;


  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username_l, password_l}),
    });

    const data = await response.json();

    if (response.ok) {

      console.log('Login successful!');

      
      console.log('Received token:', data.token);

     
      localStorage.setItem('authToken', data.token);


      localStorage.setItem('username', data.username);
      localStorage.setItem('userRole', data.role);

      form_login.reset();
      loginDialog.style.display='none';

      const successMessage = document.createElement('div');
      successMessage.textContent = `Hos geldiniz, ${data.username}`;
      successMessage.classList.add('success-message');
      const closeButton = document.createElement('button');

      closeButton.textContent = 'Close';

      closeButton.addEventListener('click', () => {
      successMessage.remove();
      form_login.reset();

  });
      successMessage.appendChild(closeButton);
      
      document.body.appendChild(successMessage);

      const loginButton = document.getElementById('authLink');
      const loginButton2 = document.getElementById('authAdmin');

      loginButton.textContent=`Logout, ${data.username}`;
     
      loginButton.addEventListener('click', () => {

        handleLogout();
});
      loginButton2.style.display='none';

      setTimeout(() => {
        successMessage.classList.add('fade-out');
        setTimeout(() => {
          successMessage.remove();
        }, 200); 
      }, 1000);
     
      
    } else{

      console.error('Login failed:', data.error);

     
      const errorMessage = document.createElement('div');
      errorMessage.textContent = 'Sifre/username hatali !';
      errorMessage.classList.add('error-message');

      const closeButton = document.createElement('button');
      closeButton.textContent = 'Close';
      closeButton.addEventListener('click', () => {
      errorMessage.remove();
      form_login.reset();
  });
      errorMessage.appendChild(closeButton);
      
      document.body.appendChild(errorMessage);

    
      console.log('Error : login failed');
      console.error(data.error);
      
    }

  } catch (error) {
    console.error('Error:', error);
   
  }
});


const form_login_admin=document.getElementById('login-form-admin');

form_login_admin.addEventListener('submit', async (event) => {
  
  event.preventDefault();
  console.log("LA form Submitted");

  const username_la = document.getElementById('username_la').value;
  const password_la = document.getElementById('password_la').value;

  if(localStorage.getItem('username')){
    handleLogout();
  }


  try {
    const response = await fetch('/auth/login/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username_la, password_la}),
    });

    const data = await response.json();

    if (response.ok) {

      console.log('Login successful!');
      console.log('Received token:', data.token);

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('userRole', data.role);

      const loginButton = document.getElementById('authLink');
      const loginButton2=document.getElementById('authAdmin');

      loginButton.textContent=`Logout, ${data.username}`;
     
      loginButton.addEventListener('click', () => {

        handleLogout();
        loginButton2.textContent='login as admin';
        loginButton2.addEventListener('click', openLogin2);

        
});

      
      loginButton2.textContent='admin modu';
      loginButton2.addEventListener('click', () => {
        
        window.location.href = '/admin-dashboard';
});

       window.location.href = '/admin-dashboard';

     
      
    } 

    else if (response.status === 403) {
      
      const errorMessage = document.createElement('div');
      errorMessage.textContent = 'Access denied. Only admin users can log in.';
      errorMessage.classList.add('error-message');

      
      const closeButton = document.createElement('button');
      closeButton.textContent = 'Close';
      closeButton.addEventListener('click', () => {
        errorMessage.remove();
        form_login_admin.reset();
      });
      errorMessage.appendChild(closeButton);

  
      document.body.appendChild(errorMessage);
    }
    
    
    
    else{

      console.error('Login failed:', data.error);

      
      const errorMessage = document.createElement('div');
      errorMessage.textContent = 'Sifre/username hatali !';
      errorMessage.classList.add('error-message');

      const closeButton = document.createElement('button');
      closeButton.textContent = 'Close';
      closeButton.addEventListener('click', () => {
      errorMessage.remove();
      form_login.reset();
  });
      errorMessage.appendChild(closeButton);
      
      document.body.appendChild(errorMessage);

      
      console.log('Error : login failed');
      console.error(data.error);
     
    }

  } catch (error) {
    console.error('Error:', error);
    
  }
});




function handleLogout() {
  
  localStorage.removeItem('authToken');
  localStorage.removeItem('username');
  localStorage.removeItem('userRole');



  const loginButton = document.getElementById('authLink');
  loginButton.textContent = `login`;
  loginButton.addEventListener('click', openLogin);
  
}



function openLogin() {
  var dialog = document.getElementById('login');
  dialog.style.display="block";
}




function handleLogin(){
  
  const authToken = localStorage.getItem('authToken');
  const username = localStorage.getItem('username');


 if (authToken && username) {

const errorM=document.createElement('div');
errorM.textContent='Once cikis yapin !';
errorM.classList.add('error-message');

const closeButton = document.createElement('button');
closeButton.textContent = 'Close';

closeButton.addEventListener('click', () => {
errorM.remove();
});

errorM.appendChild(closeButton);
document.body.appendChild(errorM);
}
else{
openLogin();
}

}



const form_res=document.getElementById('form1');


form_res.addEventListener('submit', async (event) => {
  
  event.preventDefault();
  console.log("Reservation form Submitted");

  const name_res = document.getElementById('name_res').value;
  const surname_res = document.getElementById('surname_res').value;
  const date_res = document.getElementById('date_res').value;
  const hour_res = document.getElementById('hour_res').value;
  const username_res=  localStorage.getItem('username');

  if(username_res){
    try{
      const response = await fetch('/submitReservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name_res, surname_res, username_res, date_res, hour_res}),
      });

      // const data = await response.json();

      if (response.ok) {

        console.log('Reservation made successfully!');

        form_res.reset();
        
        
  
        const successMessage = document.createElement('div');
        successMessage.textContent = `Reservation made successfully!`;
        successMessage.classList.add('success-message');
        const closeButton = document.createElement('button');
  
        closeButton.textContent = 'Close';
  
        closeButton.addEventListener('click', () => {
        successMessage.remove();
        
  
    });
        successMessage.appendChild(closeButton);
        
        document.body.appendChild(successMessage);
  
  
        setTimeout(() => {
          successMessage.classList.add('fade-out');
          setTimeout(() => {
            successMessage.remove();
            document.getElementById('dialog').style.display='none';
          }, 200); 
        }, 1000);
       

  
    }

  }
  catch (error) {
    console.error('Error:', error);
    
  }

  }

  else{
    console.log("Once giris yapin !");
    const errorMessage = document.createElement('div');
      errorMessage.textContent = 'Once giris yapin !';
      errorMessage.classList.add('error-message');

      const closeButton = document.createElement('button');
      closeButton.textContent = 'Close';
      closeButton.addEventListener('click', () => {
      errorMessage.remove();
      form_res.reset();
  });
      errorMessage.appendChild(closeButton);
      
      document.body.appendChild(errorMessage);
  }

});

