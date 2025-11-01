const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const form = document.getElementById("registration-form");
const mainContainer = document.getElementById("main-container");
const ticketContainer = document.getElementById("ticket-container");
const ticketInfo = document.getElementById("ticket-info");
const backBtn = document.getElementById("back-btn");

// Click and drag handlers
dropArea.addEventListener("click", () => fileInput.click());
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("border-accent");
});
dropArea.addEventListener("dragleave", () =>
  dropArea.classList.remove("border-accent")
);
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  handleFiles(e.dataTransfer.files);
});

// File input
fileInput.addEventListener("change", (e) => handleFiles(e.target.files));

function handleFiles(files) {
  if (files.length > 0) {
    const file = files[0];
    if (
      file.size <= 5 * 1024 * 1024 &&
      (file.type === "image/jpeg" || file.type === "image/png")
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dropArea.innerHTML = `
          <img src="${e.target.result}" alt="Avatar" 
          class="w-32 h-32 mx-auto rounded-full object-cover shadow-md border-4 border-primary transition-transform duration-500 hover:scale-105"/>`;
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a JPG or PNG image under 5MB.");
    }
  }
}

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const github = document.getElementById("github-username").value;

  // Hide form, show ticket
  mainContainer.classList.add("hidden");
  ticketContainer.classList.remove("hidden");

  // Fill ticket info
  ticketInfo.innerHTML = `
    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>GitHub:</strong> <a href="https://github.com/${github}" target="_blank" class="text-accent underline">@${github}</a></p>
  `;

  // Animate fade in
  ticketContainer.classList.add("animate-fadeIn");
});

// Back to form
backBtn.addEventListener("click", () => {
  ticketContainer.classList.add("hidden");
  mainContainer.classList.remove("hidden");
});

// Simple animation keyframe
const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fadeIn {
  animation: fadeIn 0.6s ease-in-out;
}
`;
document.head.appendChild(style);
