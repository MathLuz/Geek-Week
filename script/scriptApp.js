let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault(); // Impede o prompt automático
      deferredPrompt = event; // Armazena o evento para uso posterior
    });

    function exibirPrompt() {
      if (deferredPrompt) {
        // Exibe o prompt de instalação
        deferredPrompt.prompt();

        // Captura o resultado da escolha do usuário
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Usuário aceitou instalar o aplicativo');
          } else {
            console.log('Usuário recusou a instalação do aplicativo');
          }

          deferredPrompt = null; // Limpa a referência ao evento
        });
      }
    }