const form = document.getElementById("leadForm");
const formMessage = document.getElementById("formMessage");

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyzjvLBRnfc6xkCZcIuBcMzw22Ah_j53u7AbJReBe1S2UuZSwq4dcA8giQ3nCRrpPFakg/exec";
const WHATSAPP_NUMBER = "447490908644";

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    fullName: document.getElementById("fullName").value.trim(),
    whatsapp: document.getElementById("whatsapp").value.trim(),
    birthDate: document.getElementById("birthDate").value.trim(),
    country: document.getElementById("country").value.trim(),
    message: document.getElementById("message").value.trim()
  };

  formMessage.textContent = "جارٍ إرسال المعلومات...";
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
      formMessage.innerHTML = "تم إرسال معلوماتك بنجاح.<br>يمكنك الآن إكمال التحقق عبر واتساب.";
      formMessage.style.color = "#79f2a4";

      const whatsappText = encodeURIComponent(
        `مرحباً، لقد أرسلت معلوماتي عبر الموقع وأرغب في إكمال التحقق.\nالاسم: ${data.fullName}\nتاريخ الازدياد: ${data.birthDate}\nرقم الواتساب: ${data.whatsapp}\nالدولة: ${data.country}`
      );

      form.reset();

      setTimeout(() => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`, "_blank");
      }, 1200);
    } else {
      formMessage.textContent = "حدث خطأ أثناء الإرسال. حاول مرة أخرى.";
      formMessage.style.color = "#ff9b9b";
    }
  } catch (error) {
    formMessage.textContent = "تعذر الإرسال حالياً.";
    formMessage.style.color = "#ff9b9b";
    console.error(error);
  }
});
