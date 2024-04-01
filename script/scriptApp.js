// VERIFICA SE FOI ABERTO NA WEB
if (!window.matchMedia('(display-mode: standalone)').matches) {
  
  // PARA NÃO APARECER O TEMPO TODO PARA O USUÁRIO BAIXAR

  // Verificar se o usuário já acessou a página
  function hasUserVisitedPage() {
    return document.cookie.indexOf('visited=true') !== -1;
  }
  // Definir um cookie para marcar que o usuário visitou a página
  function setVisitedCookie() {
    // Obter a data atual
    var now = new Date();
    // Definir a data de expiração
    var expirationDate = new Date(now.getTime() + 30 * 60 * 1000);  // min * seg * mil
    // Formatar a data de expiração para o formato GMT
    var expiresGMT = expirationDate.toUTCString();
    // Definir o cookie com a data de expiração ajustada
    document.cookie = 'visited=true; expires=' + expiresGMT + '; path=/; SameSite=None; Secure';
  }
  // Exibir a função apenas na primeira vez que o usuário acessar (dentro da quantidade de tempo)
  if (!hasUserVisitedPage()) {

    // CASO SEJA ABERTO NO SAFARI
    // Verifica se o navegador é o Safari
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    // Verifica se está em um dispositivo iOS
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isSafari && isIOS) {

      //console.log("Você está usando o Safari.");
      // Sweet Alert para manual de Download no Safari
      Swal.fire({
        background: '#0a0a0a',
        color: '#fff',
        title: 'Adicione à tela de início!',
        text: 'Para ficar por dentro de tudo que precisa saber sobre a semana Geek.',
        imageUrl: 'img/downloadSafari.jpg',
        imageWidth: 400,
        imageAlt: 'Baixar o App Geek Week',
        confirmButtonColor: '#f4a917',
      });
    } else {
      // Sweet Alert
      Swal.fire({
        title: 'Instale o App!!',
        text: "Para ficar por dentro de tudo que precisa saber sobre a semana Geek.",
        icon: 'info',
        background: '#0a0a0a',
        color: '#fff',
        showCancelButton: true,
        confirmButtonColor: '#f4a917',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Quero baixar!',
        preConfirm: () => {
          baixarApp();
        }
      });

      // PARA BAIXAR O APP NO ANDROID

      let deferredPrompt;

      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault(); // Impede o prompt automático
        deferredPrompt = event; // Armazena o evento para uso posterior
      });

      function baixarApp() {
        if (deferredPrompt) {

          // Exibe o prompt de instalação
          deferredPrompt.prompt();
          /*
                // Captura o resultado da escolha do usuário
                deferredPrompt.userChoice.then((choiceResult) => {
                  if (choiceResult.outcome === 'accepted') {
                    console.log('Usuário aceitou instalar o aplicativo');
                  }
                  deferredPrompt = null; // Limpa a referência ao evento
                });
          */
        }
      }
    }

    // Depois de exibir a função, marque o usuário como visitado 
    setVisitedCookie();
  }
}
