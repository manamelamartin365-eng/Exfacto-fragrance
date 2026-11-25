(() => {
  "use strict";
  const SUPABASE_URL = "https://udsnbtmakcyqhmfdqqre.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_u9261Mg24iVJKB9ierScZw_qkKs3YRv";
  const form = document.getElementById("invite-form");
  const button = document.getElementById("submit-button");
  const message = document.getElementById("form-message");

  const showMessage = (text, isError = false) => {
    message.textContent = text;
    message.className = "message show" + (isError ? " error" : "");
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const token = document.getElementById("token").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (SUPABASE_ANON_KEY === "ADD_YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY_HERE") {
      showMessage("The secure Supabase connection still needs to be configured.", true);
      return;
    }
    if (password.length < 10) {
      showMessage("Please use a password with at least 10 characters.", true);
      return;
    }
    if (password !== confirmPassword) {
      showMessage("The passwords do not match. Please check them and try again.", true);
      return;
    }

    button.disabled = true;
    button.textContent = "VERIFYING…";
    try {
      const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const { error: verifyError } = await client.auth.verifyOtp({
        email,
        token,
        type: "invite"
      });
      if (verifyError) throw verifyError;

      const { error: passwordError } = await client.auth.updateUser({ password });
      if (passwordError) throw passwordError;

      showMessage("Your invitation has been accepted and your password has been set. Your admin sign-in page will be added next.");
      form.querySelectorAll("input").forEach((input) => { input.disabled = true; });
      button.textContent = "INVITATION ACCEPTED";
    } catch (error) {
      showMessage(error && error.message ? error.message : "We could not verify this invitation. Check the email address and code, then try again.", true);
      button.disabled = false;
      button.textContent = "VERIFY INVITATION & SET PASSWORD";
    }
  });
})();