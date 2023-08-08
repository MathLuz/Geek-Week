// Voltar um página
function goBack() {
    window.history.back();
}
// Filtros de datas
document.addEventListener("DOMContentLoaded", function () {
    const tagButtons = document.querySelectorAll(".tag-btn");
    const eventItems = document.querySelectorAll(".itens");

    // Adicione um evento de clique a todos os botões de tag
    tagButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedTag = this.getAttribute("data-tag");

            // Ocultar todos os itens de evento
            eventItems.forEach(item => {
                item.classList.add("hide");
            });

            // Mostrar apenas os itens de evento do dia selecionado
            const selectedItems = document.querySelectorAll(`[data-tag="${selectedTag}"]`);
            selectedItems.forEach(item => {
                item.classList.remove("hide");
            });

            // Remover classe "selected" de todos os botões e adicionar ao botão clicado
            tagButtons.forEach(btn => {
                btn.classList.remove("selected");
            });
            this.classList.add("selected");
        });
    });
});
