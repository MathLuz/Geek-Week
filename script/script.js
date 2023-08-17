// Função para os filtros por dia
const tagButtons = document.querySelectorAll(".tag-btn");
const eventItems = document.querySelectorAll(".itens");

// Função para filtrar eventos por tag
function filterEvents(selectedTag) {
    eventItems.forEach(item => {
        item.classList.add("hide");
    });
    const selectedItems = document.querySelectorAll(`[data-tag="${selectedTag}"]`);
    selectedItems.forEach(item => {
        item.classList.remove("hide");
    });
    tagButtons.forEach(btn => {
        btn.classList.remove("selected");
    });
// Para suber a tela para o top quando muda o dia
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

// Obtém o dia da semana atual (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
const currentDayIndex = new Date().getDay();

// Dias da semana correspondentes aos botões de tag
const daysOfWeek = ["seg", "seg", "ter", "qua", "qui", "sex", "sab"];

// Dia da semana atual (dom, seg, ter, etc.)
const currentDay = daysOfWeek[currentDayIndex];

// Filtra eventos quando a página é carregada
document.addEventListener("DOMContentLoaded", function () {
    filterEvents(currentDay); // Filtra eventos inicialmente pelo dia atual

    // Encontra o botão correspondente ao dia atual e adiciona a classe "selected"
    const currentButton = document.querySelector(`.tag-btn[data-tag="${currentDay}"]`);
    currentButton.classList.add("selected");
});

// Adiciona um evento de clique a todos os botões de tag
tagButtons.forEach(button => {
    button.addEventListener("click", function () {
        const selectedTag = this.getAttribute("data-tag");
        filterEvents(selectedTag);
        this.classList.add("selected");
    });
});
