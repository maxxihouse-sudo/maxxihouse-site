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

  // Slide Viewer / Apresentação de Serviços (Enquadramento Perfeito 16:9)
  const slides = document.querySelectorAll('.slide-slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const counter = document.getElementById('slideCounter');
  const dotsContainer = document.getElementById('slideDots');
  let currentSlide = 0;

  if (slides.length > 0) {
    // Cria os pontinhos de navegação
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.classList.add('slide-dot');
      dot.setAttribute('aria-label', `Ir para slide ${idx + 1}`);
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => showSlide(idx));
      if (dotsContainer) dotsContainer.appendChild(dot);
    });

    function showSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentSlide = index;

      slides.forEach((s, idx) => {
        s.classList.toggle('active', idx === currentSlide);
      });

      if (dotsContainer) {
        dotsContainer.querySelectorAll('.slide-dot').forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentSlide);
        });
      }

      if (counter) {
        counter.textContent = `${currentSlide + 1} de ${slides.length}`;
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    // Suporte a swipe no celular
    const viewport = document.querySelector('.slide-viewport');
    if (viewport) {
      let touchStartX = 0;
      let touchEndX = 0;

      viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
          showSlide(currentSlide + 1); // Swipe esquerda
        } else if (touchEndX - touchStartX > 50) {
          showSlide(currentSlide - 1); // Swipe direita
        }
      }, { passive: true });
    }
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

      window.open(whatsappUrl, '_blank');
    });
  }
});
