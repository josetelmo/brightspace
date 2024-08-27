document.addEventListener("DOMContentLoaded", function() {
    const content = document.getElementById('content');
    const navigationButtons = document.querySelector('.navigation-buttons');
    const originalContentHTML = content.innerHTML;  // Armazena o HTML original do conteúdo
    let slides = [];
    let currentSlide = 0;

    // Função para criar slides a partir do conteúdo original
    function createSlides() {
        const contentHTML = originalContentHTML;  // Usa o conteúdo original
        slides = contentHTML.split('<!---more--->');  // Divide o conteúdo pelos separadores

        content.innerHTML = '';  // Limpa o conteúdo original

        slides.forEach((slideContent) => {
            let slide = document.createElement('div');
            slide.classList.add('slide');
            slide.style.display = 'none';
            slide.innerHTML = slideContent.trim();  // Remove espaços em branco ao redor do conteúdo
            content.appendChild(slide);
        });

        slides = content.querySelectorAll('.slide');  // Atualiza a referência para os slides criados
    }

    // Função para exibir o slide atual
    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('slide-ativo');
                slide.style.display = 'flex';
            } else {
                slide.classList.remove('slide-ativo');
                slide.style.display = 'none';
            }
        });
    }

    // Função para iniciar a apresentação
    document.getElementById('start-slide-show').addEventListener('click', () => {
        if (slides.length === 0) {
            createSlides();  // Cria os slides a partir do conteúdo original
        }
        if (slides.length > 0) {
            document.body.classList.add('slide-mode');
            navigationButtons.style.display = 'block';
            currentSlide = 0;  // Reinicia o índice do slide
            showSlide(currentSlide);
        } else {
            alert("Nenhum slide foi encontrado.");
        }
    });

    // Função para fechar a apresentação e restaurar o conteúdo original
    document.getElementById('close-slide-show').addEventListener('click', closePresentation);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closePresentation();
        }
        if (event.key === 'ArrowRight') {
            nextSlide();
        }
        if (event.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Função para fechar a apresentação
    function closePresentation() {
        document.body.classList.remove('slide-mode');
        navigationButtons.style.display = 'none';
        content.innerHTML = originalContentHTML;  // Restaura o conteúdo original
        slides = [];  // Limpa os slides para permitir recriação ao reabrir
        currentSlide = 0;  // Reinicia o índice do slide
    }

    // Função para mostrar o próximo slide
    function nextSlide() {
        if (slides.length > 0) {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
    }

    // Função para mostrar o slide anterior
    function prevSlide() {
        if (slides.length > 0) {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
    }

    // Registro dos eventos de clique nos botões
    document.getElementById('next-slide').addEventListener('click', nextSlide);
    document.getElementById('prev-slide').addEventListener('click', prevSlide);

    // Certifique-se de que o conteúdo original é exibido ao carregar a página
    navigationButtons.style.display = 'none';  // Esconde os botões de navegação inicialmente
});
