const form = document.getElementById("leadForm");
const formMessage = document.getElementById("formMessage");

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJf28Z5zkEEXTJDIQSCq-D6bVxxrIztq8uHhifMfK1o1fOojONBtnxVrzjGYIhEi2xeg/exec";
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
      body: new URLSearchParams(data)
    });

    const resultText = await response.text();

    if (response.ok) {
      formMessage.innerHTML = "تم إرسال معلوماتك بنجاح.<br>يمكنك الآن إكمال التحقق عبر واتساب.";
      formMessage.style.color = "#79f2a4";

      const whatsappText = encodeURIComponent(
        `مرحباً، لقد أرسلت معلوماتي عبر الموقع وأرغب في إكمال التحقق.
الاسم: ${data.fullName}
تاريخ الازدياد: ${data.birthDate}
رقم الواتساب: ${data.whatsapp}
الدولة: ${data.country}`
      );

      form.reset();

      setTimeout(() => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`, "_blank");
      }, 1200);
    } else {
      formMessage.textContent = "حدث خطأ أثناء الإرسال. حاول مرة أخرى.";
      formMessage.style.color = "#ff9b9b";
      console.error(resultText);
    }
  } catch (error) {
    formMessage.textContent = "تعذر الإرسال حالياً.";
    formMessage.style.color = "#ff9b9b";
    console.error(error);
  }
});
