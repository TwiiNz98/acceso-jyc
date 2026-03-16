const Toast = {
  show(message, type = "default", duration = 3000) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const icons = { default:"💬", success:"✅", warning:"⚠️", error:"❌", whatsapp:"📱" };
    const toast = document.createElement("div");
    toast.className = "toast toast--" + type;
    toast.innerHTML = '<span class="toast__icon">'+(icons[type]||"💬")+'</span><span>'+message+'</span>';
    container.appendChild(toast);
    setTimeout(() => { toast.classList.add("out"); setTimeout(() => toast.remove(), 300); }, duration);
  }
};
