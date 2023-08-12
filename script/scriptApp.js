// PARA BAIXAR O APP NO ANDROID

    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault(); // Impede o prompt automático
      deferredPrompt = event; // Armazena o evento para uso posterior
    });

    function baixarApp() {
      console.log('ativou em')
      if (deferredPrompt) {
        // Exibe o prompt de instalação
        deferredPrompt.prompt();

        // Captura o resultado da escolha do usuário
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Usuário aceitou instalar o aplicativo');
          } else {
            alert('Usuário recusou a instalação do aplicativo');
          }

          deferredPrompt = null; // Limpa a referência ao evento
        });
      }
    }

// VENDO SE FOI ABERTO EM NO SITE

if (!window.matchMedia('(display-mode: standalone)').matches) {
  // Código a ser executado quando NÃO estiver em modo autônomo (navegador comum)
  // console.log("Não está em modo autônomo");

  // Sweet Alert
  Swal.fire({
    title: 'Baixe o App!!',
    text: "Para ficar por dentro de tudo que precisa saber sobre a semana Geek",
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
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault(); // Impede o prompt automático
      deferredPrompt = event; // Armazena o evento para uso posterior
    });

    function baixarApp() {
      console.log('ativou em')
      if (deferredPrompt) {
        // Exibe o prompt de instalação
        deferredPrompt.prompt();

        // Captura o resultado da escolha do usuário
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Usuário aceitou instalar o aplicativo');
          } else {
            alert('Usuário recusou a instalação do aplicativo');
          }

          deferredPrompt = null; // Limpa a referência ao evento
        });
      }
    }
  }