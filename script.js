const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const form = document.getElementById('registration-form');

dropArea.addEventListener('click', () => {
    fileInput.click();
});

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.style.borderColor = '#8b5cf6';
});

dropArea.addEventListener('dragleave', () => {
    dropArea.style.borderColor = '#4b5563';
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.style.borderColor = '#4b5563';
    const files = event.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    handleFiles(files);
});

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        if (file.size <= 5 * 1024 * 1024 && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                dropArea.innerHTML = `<img src="${e.target.result}" alt="Avatar" style="width: 100%; height: 100%; object-cover: cover; border-radius: 0.5rem;"/>`;
            };
            reader.readAsDataURL(file);
        } else {
            alert('File must be a JPG or PNG image and less than 5MB.');
        }
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const githubUsername = document.getElementById('github-username').value;

    alert(`Ticket generated for ${fullName} with email ${email} and GitHub username ${githubUsername}.`);
});