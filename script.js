const form = document.getElementById("leadForm");
const formMessage = document.getElementById("formMessage");

const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    fullName: document.getElementById("fullName").value.trim(),
    whatsapp: document.getElementById("whatsapp").value.trim(),
    country: document.getElementById("country").value.trim(),
    age: document.getElementById("age").value.trim(),
    message: document.getElementById("message").value.trim()
  };

  formMessage.textContent = "جارٍ إرسال الطلب...";
  formMessage.style.color = "#d7e6ff";

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();

    if (result.result === "success") {
      formMessage.textContent = "تم إرسال طلبك بنجاح.";
      formMessage.style.color = "#79f2a4";
      form.reset();
    } else {
      formMessage.textContent = "حدث خطأ، حاول مرة أخرى.";
      formMessage.style.color = "#ff9b9b";
    }
  } catch (error) {
    formMessage.textContent = "تعذر الإرسال حالياً.";
    formMessage.style.color = "#ff9b9b";
    console.error(error);
  }
});
