document.addEventListener('DOMContentLoaded', function () {
  // Menu mobile
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (nav.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Fechar menu ao clicar em qualquer link
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // Accordion FAQ
  document.querySelectorAll('.accordion-header').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.parentElement;
      const body = btn.nextElementSibling;
      const isOpen = item.classList.contains('active');

      // Fecha todos os outros
      document.querySelectorAll('.accordion-item').forEach(function (el) {
        el.classList.remove('active');
        if (el.querySelector('.accordion-body')) {
          el.querySelector('.accordion-body').style.maxHeight = null;
        }
      });

      // Abre o atual se não estava aberto
      if (!isOpen) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Envio do formulário direto para o WhatsApp do Engenheiro
  const orcamentoForm = document.getElementById('orcamentoForm');
  if (orcamentoForm) {
    orcamentoForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(orcamentoForm);
      const nome = formData.get('nome') || '';
      const email = formData.get('email') || '';
      const telefone = formData.get('telefone') || '';
      const tipoImovel = formData.get('tipo_imovel') || 'Não especificado';
      const cidade = formData.get('cidade') || 'Não especificada';
      const finalidade = formData.get('finalidade') || 'Não especificada';
      const matriculas = formData.get('matriculas') || '1';
      const vistoria = formData.get('vistoria') || 'Não especificado';
      const drone = formData.get('drone') || 'Não especificado';
      const prazo = formData.get('prazo') || 'A combinar';
      const mensagem = formData.get('mensagem') || '';

      let texto = `*SOLICITAÇÃO DE ORÇAMENTO - MAXXIHOUSE*\n\n`;
      texto += `👤 *Nome:* ${nome}\n`;
      texto += `📱 *Telefone/WhatsApp:* ${telefone}\n`;
      texto += `✉️ *E-mail:* ${email}\n`;
      texto += `🏢 *Tipo de Imóvel:* ${tipoImovel}\n`;
      texto += `📍 *Cidade e Bairro:* ${cidade}\n`;
      texto += `🎯 *Finalidade:* ${finalidade}\n`;
      texto += `📑 *Matrículas:* ${matriculas}\n`;
      texto += `🔍 *Precisa de Vistoria:* ${vistoria}\n`;
      texto += `🚁 *Precisa de Drone:* ${drone}\n`;
      texto += `⏱️ *Prazo desejado:* ${prazo}\n`;
      if (mensagem.trim() !== '') {
        texto += `\n📝 *Mensagem:* ${mensagem}\n`;
      }

      const encodedText = encodeURIComponent(texto);
      const whatsappUrl = `https://wa.me/5511995407942?text=${encodedText}`;

      // Abre o WhatsApp com a mensagem formatada
      window.open(whatsappUrl, '_blank');
    });
  }
});
