document.addEventListener("DOMContentLoaded", () => {
  // ===== INDEX.HTML - atualização do dropzone =====
  const dropzoneInput = document.getElementById("dropzone-file");
  if (dropzoneInput) {
    dropzoneInput.addEventListener("change", () => {
      if (dropzoneInput.files.length > 0) {
        const dropzoneLabel = dropzoneInput.closest("label");
        const spanBold = dropzoneLabel.querySelector("span.font-semibold");
        const spanSmall = dropzoneLabel.querySelector("span.text-xs");

        // Altera o texto
        spanBold.textContent = `Arquivo ${dropzoneInput.files[0].name} inserido`;
        spanSmall.textContent = "";

        // Altera a cor
        dropzoneLabel.classList.remove("text-indigo-400");
        dropzoneLabel.classList.add("text-emerald-400");
      }
    });
  }

  // ===== SELECT_COLUMNS.HTML - gerar CSV sem recarregar =====
  const columnsForm = document.getElementById("columnsForm");
  const submitBtn = document.getElementById("submitColumnsBtn");

  if (columnsForm && submitBtn) {
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault(); // evita submissão do form

      const formContainer = columnsForm.querySelector("div.grid");
      if (formContainer) {
        formContainer.innerHTML = ""; // remove as colunas
      }

      // Cria mensagem de sucesso dentro do form
      let successMessage = document.createElement("p");
      successMessage.textContent = "Arquivo gerado com sucesso!";
      successMessage.className = "text-green-600 text-lg font-semibold text-center mt-6";

      columnsForm.appendChild(successMessage);
    });
  }
});
