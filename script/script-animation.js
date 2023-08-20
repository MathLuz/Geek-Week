// Para a nimação acontecer apenas em tela

// Função para verificar se um elemento está visível na tela
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

// Função para adicionar classe de animação quando o elemento é visível
function handleScrollAnimations() {
    // Seleciona todos os elementos com classes de animação
    const elements = document.querySelectorAll('.daEsquerda, .daDireita');

    elements.forEach(element => {
        if (isElementVisible(element) && !element.classList.contains('active')) {
            element.classList.add('active'); // Adiciona a classe 'active' para ativar a animação
        }
    });
}

// Ativar animações quando a página é carregada
window.addEventListener('load', handleScrollAnimations);

// Ativar animações quando o usuário faz scroll
window.addEventListener('scroll', handleScrollAnimations);
