document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("dropzone-file");
    const label = fileInput.closest("label");
    const spanTitle = label.querySelector("span.font-semibold");
    const spanSubtitle = label.querySelector("span.text-xs");

    // Função para atualizar o label
    function updateLabel(fileName) {
        label.classList.remove("text-indigo-400");
        label.classList.add("text-emerald-400");
        spanTitle.textContent = `Arquivo ${fileName} inserido`;
        spanSubtitle.textContent = ""; // remove subtítulo
    }

    // Verifica se já existe arquivo registrado na sessionStorage
    const storedFileName = sessionStorage.getItem("uploadedFileName");
    if (storedFileName) {
        updateLabel(storedFileName);
    }

    // Evento de seleção do arquivo
    fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;

            // Atualiza interface
            updateLabel(fileName);

            // Armazena somente o nome do arquivo
            sessionStorage.setItem("uploadedFileName", fileName);
        }
    });
});
