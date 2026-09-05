// =====================================================
// Contact Us Form - PhysioFlex
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");

    // Form not available on current page
    if (!form) {
        return;
    }

    const submitBtn = document.getElementById("submitBtn");
    const loading = document.getElementById("loading");
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");

    const API_URL = "https://api.physioflex.in/api/contact/save";

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        errorMessage.style.display = "none";
        successMessage.style.display = "none";

        const contact = {

            fullName: document.getElementById("fullName").value.trim(),

            mobileNo: document.getElementById("mobileNo").value.trim(),

            email: document.getElementById("email").value.trim(),

            subject: document.getElementById("subject").value,

            message: document.getElementById("message").value.trim()

        };

        // ============================
        // Frontend Validation
        // ============================

        if (contact.fullName === "") {
            showError("Please enter your full name.");
            return;
        }

        if (!/^[A-Za-z ]+$/.test(contact.fullName)) {
            showError("Please enter a valid name.");
            return;
        }

        if (!/^[6-9][0-9]{9}$/.test(contact.mobileNo)) {
            showError("Please enter a valid mobile number.");
            return;
        }

        if (contact.email !== "" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {

            showError("Please enter a valid email address.");
            return;
        }

        if (contact.subject === "") {
            showError("Please select an inquiry.");
            return;
        }

        if (contact.message === "") {
            showError("Please enter your message.");
            return;
        }

        if (contact.message.length < 10) {
            showError("Message should contain at least 10 characters.");
            return;
        }

        loading.style.display = "block";
        submitBtn.disabled = true;

        try {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(contact)

            });

            const result = await response.json();

            loading.style.display = "none";
            submitBtn.disabled = false;

            if (result.success) {

                successMessage.innerHTML = result.message;
                successMessage.style.display = "block";

                form.reset();

            } else {

                showError(result.message);

            }

        } catch (error) {

            console.error(error);

            showError("Unable to connect to the server. Please try again.");

        }

    });

    function showError(message) {

        loading.style.display = "none";

        submitBtn.disabled = false;

        successMessage.style.display = "none";

        errorMessage.innerHTML = message;

        errorMessage.style.display = "block";

    }

});