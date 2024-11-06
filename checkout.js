window.onload = function() {
    // Get the total amount from local storage and parse it
    const totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0; // Default to 0 if not set
    const totalParagraph = document.getElementById('total-amount');

    // Add R50 if total amount is less than R50
    const adjustedTotal = totalAmount < 50 ? totalAmount + 50 : totalAmount + 5;

    // Display the adjusted total amount
    totalParagraph.innerText = `Your total amount is: R${adjustedTotal.toFixed(2)}`; // Format to 2 decimal places
    document.getElementById("card").style.display = 'none'; // Hide card payment section by default
    document.getElementById("paypal").style.display = 'none'; // Hide PayPal payment section by default
};

function payment(val) {
    // Show payment method based on selection
    document.getElementById("paypal").style.display = val === 1 ? 'block' : 'none';
    document.getElementById("card").style.display = val === 2 ? 'block' : 'none';
}

function showAlert(message) {
    // Display alert for error messages
    alert(message);
    return false;
}

function order_placed() {
    // Get billing form values
    const billingForm = document.forms["billing"];
    const { name, email, address, number, country } = billingForm;

    // Validate billing details
    if (!name.value || !email.value || !address.value || !number.value || !country.value) {
        return showAlert("Please fill in your details");
    }
/*
    if (!/^[a-zA-Z]+$/.test(name.value) || !/^[a-zA-Z]+$/.test(country.value)) {
        return showAlert("Name, surname, and country should only contain letters");
    }*/

    // Allow letters and spaces for name and country
    if (!/^[a-zA-Z\s]+$/.test(name.value) || !/^[a-zA-Z\s]+$/.test(country.value) ) {
        return showAlert("Name and country should only contain letters and spaces");
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(address.value)) {
        return showAlert("Address should only contain letters, numbers, and spaces");
    }

    if (number.value.length !== 10 || !number.value.startsWith("0")) {
        return showAlert("Number must be 10 characters long and start with 0");
    }

    if (!email.value.includes("@")) {
        return showAlert("Email should include '@'");
    }

    // Get payment details
    const card = document.getElementById("card1");
    const paypal = document.getElementById("paypal1");
    const { value: cardnum } = document.getElementById("cardnum");
    const { value: expdate } = document.getElementById("expdate");
    const { value: ccv } = document.getElementById("ccv");
    const { value: username } = document.getElementById("username");
    const { value: password } = document.getElementById("password");
    const terms = document.getElementById("terms");

    // Validate payment method details
    if (card.checked) {
        if (!cardnum || !expdate || !ccv) {
            return showAlert("Please fill in the card details");
        }
        if (cardnum.length !== 16) {
            return showAlert("Card number must be 16 digits");
        }
        if (ccv.length !== 3) {
            return showAlert("CCV must be 3 digits");
        }

        const month = parseInt(expdate.substring(0, 2), 10);
        const year = parseInt(expdate.substring(2, 4), 10);
        if (month <= 0 || month > 12 || year < 24 || year > 99) {
            return showAlert("Invalid expiration date");
        }
    }

    if (paypal.checked) {
        if (!username || !password) {
            return showAlert("Please fill in your PayPal details");
        }
    }

    if (!card.checked && !paypal.checked) {
        return showAlert("Please select a payment method");
    }
    
    if (!terms.checked) {
        return showAlert("Please check terms and conditions");
    }

    // If all checks pass
    alert("Your order has been placed successfully");
        // Refresh the page
        location.reload();
}
