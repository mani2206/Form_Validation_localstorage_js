const form = document.querySelector("#form");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const refername = document.querySelector("#refername");
const authorizeWork = document.querySelector("#authorizework");
const authorizeInterview = document.querySelector("#authorizeinterview");
const mobile = document.querySelector('#mobile');
const clearButton = document.getElementById("clearButton")

window.onload = function () {
    loadFormValues();
};

form.addEventListener("submit", (e) => {
    if (!validateInputs()) {
        e.preventDefault();
    } else {
        // Save form values to local storage on successful submission
        saveFormValues();
    }
});

clearButton.addEventListener("click", () => {
    clearForm();
});

function validateInputs() {
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const refernameValue = refername.value.trim();
  const mobileValue = mobile.value.trim()
  const authorizeWorkValue = authorizeWork.value;
  const authorizeInterviewValue = authorizeInterview.value;

  if (firstNameValue === "") {
    setError(firstName, "First name is required");
  } else {
    setSuccess(firstName);
  }

  if (lastNameValue === "") {
    setError(lastName, "Last name is required");
  } else {
    setSuccess(lastName);
  }

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Enter a valid email address");
  } else {
    setSuccess(email);
  }

  if (refernameValue === "") {
    setError(refername, "reference name is required");
  } else {
    setSuccess(refername);
  }

  if (authorizeWorkValue === "-None-") {
    setError(authorizeWork, "Please select an option");
  } else {
    setSuccess(authorizeWork);
  }

  if (authorizeInterviewValue === "-None-") {
    setError(authorizeInterview, "Please select an option");
  } else {
    setSuccess(authorizeInterview);
  }

  if(mobileValue === ""){
    setError(mobile, "Enter a valid mobile number");
  }else{
    setSuccess(mobile)
  }

//   // Return true if all dropdowns are valid, false otherwise
//   return !(
//     authorizeWorkValue === "-None-" || authorizeInterviewValue === "-None-"
//   );
  // Return true if all inputs are valid, false otherwise
  return !(
    firstNameValue === "" ||
    lastNameValue === "" ||
    emailValue === "" ||
    !isValidEmail(emailValue)
  );
}

function setError(element, message) {
  const errorElement = element.nextElementSibling;
  errorElement.innerText = message;
}

function setSuccess(element) {
  const errorElement = element.nextElementSibling;
  errorElement.innerText = "";
}

function isValidEmail(email) {
  // Use a regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function saveFormValues() {
    // Save form values to local storage
    const formValues = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        refername: refername.value.trim(),
        authorizeWork: authorizeWork.value.trim(),
        authorizeInterview: authorizeInterview.value.trim(),
        mobile: mobile.value.trim(),
    };

    try {
        localStorage.setItem("formValues", JSON.stringify(formValues));
    } catch (error) {
        console.error("Error saving to local storage:", error.message);
    }
}

function loadFormValues() {
    // Load form values from local storage
    try {
        const storedFormValues = localStorage.getItem("formValues");

        if (storedFormValues) {
            const parsedFormValues = JSON.parse(storedFormValues);

            // Set form values from local storage
            firstName.value = parsedFormValues.firstName;
            lastName.value = parsedFormValues.lastName;
            email.value = parsedFormValues.email;
            refername.value = parsedFormValues.refername;
            authorizeWork.value = parsedFormValues.authorizeWork;
            authorizeInterview.value = parsedFormValues.authorizeInterview;
            mobile.value = parsedFormValues.mobile;
        }
    } catch (error) {
        console.error("Error loading from local storage:", error.message);
    }
}

function clearForm() {
    // Clear input values
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.value = '';
    });

    // Clear error messages
    const errorElements = form.querySelectorAll('.error');
    errorElements.forEach(errorElement => {
        errorElement.innerText = '';
    });

    // Clear local storage
    try {
        localStorage.removeItem("formValues");
    } catch (error) {
        console.error("Error clearing local storage:", error.message);
    }
}

// // another method
// const form = document.querySelector("#form");
// const clearButton = document.getElementById("clearButton");

// const inputFields = [
//   "firstName",
//   "lastName",
//   "email",
//   "refername",
//   "mobile",
// ];

// window.onload = loadFormValues;

// form.addEventListener("submit", (e) => {
//   if (!validateInputs()) {
//     e.preventDefault();
//   } else {
//     saveFormValues();
//   }
// });

// clearButton.addEventListener("click", clearForm);

// function validateInputs() {
//   let isValid = true;

//   inputFields.forEach((field) => {
//     const element = document.querySelector(`#${field}`);
//     const value = element.value.trim();

//     if (value === "") {
//       setError(element, `${field} is required`);
//       isValid = false;
//     } else {
//       setSuccess(element);
//     }
//   });

//   const emailElement = document.querySelector("#email");
//   const emailValue = emailElement.value.trim();

//   if (emailValue === "") {
//     setError(emailElement, "Email is required");
//     isValid = false;
//   } else if (!isValidEmail(emailValue)) {
//     setError(emailElement, "Enter a valid email address");
//     isValid = false;
//   } else {
//     setSuccess(emailElement);
//   }

//   return isValid;
// }

// function setError(element, message) {
//   const errorElement = element.nextElementSibling;
//   errorElement.innerText = message;
// }

// function setSuccess(element) {
//   const errorElement = element.nextElementSibling;
//   errorElement.innerText = "";
// }

// function saveFormValues() {
//     const formValues = {};
  
//     inputFields.forEach((field) => {
//       const element = document.querySelector(`#${field}`);
//       formValues[field] = element.value.trim();
//     });
  
//     try {
//       localStorage.setItem("formValues", JSON.stringify(formValues));
//     } catch (error) {
//       console.error("Error saving to local storage:", error.message);
//     }
//   }
  
//   function loadFormValues() {
//     try {
//       const storedFormValues = localStorage.getItem("formValues");
  
//       if (storedFormValues) {
//         const parsedFormValues = JSON.parse(storedFormValues);
  
//         inputFields.forEach((field) => {
//           const element = document.querySelector(`#${field}`);
//           if (parsedFormValues.hasOwnProperty(field)) {
//             element.value = parsedFormValues[field];
//           }
//         });
//       }
//     } catch (error) {
//       console.error("Error loading from local storage:", error.message);
//     }
//   }
  
//   function clearForm() {
//     try {
//       localStorage.removeItem("formValues");
//     } catch (error) {
//       console.error("Error clearing local storage:", error.message);
//     }
  
//     inputFields.forEach((field) => {
//       const element = document.querySelector(`#${field}`);
//       element.value = "";
//       setSuccess(element);
//     });
//   }