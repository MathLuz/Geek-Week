// Voltar um página
function goBack() {
    window.history.back();
}
// Filtros de datas
document.addEventListener("DOMContentLoaded", function () {
    const tagButtons = document.querySelectorAll(".tag-btn");
    const items = document.querySelectorAll(".itens");

    tagButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedTag = button.getAttribute("data-tag");

            items.forEach(item => {
                if (selectedTag === "all" || item.getAttribute("data-tags").includes(selectedTag)) {
                    item.classList.add("show");
                } else {
                    item.classList.remove("show");
                }
            });
        });
    });
});