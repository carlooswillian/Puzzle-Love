function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

function loadImage(image) {
    document.getElementById('puzzle-image').src = image;
    generatePuzzlePieces();
}

function generatePuzzlePieces() {
    const puzzlePiecesContainer = document.getElementById('puzzle-pieces');
    puzzlePiecesContainer.innerHTML = ''; // Limpa as peças anteriores

    // Exemplo: gerar peças aleatórias
    for (let i = 0; i < 20; i++) {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.style.width = '100px'; // Ajustar conforme os tamanhos e formatos
        piece.style.height = '100px';
        piece.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
        piece.innerText = i + 1;
        puzzlePiecesContainer.appendChild(piece);
    }
}

// Gera peças ao carregar a página
generatePuzzlePieces();
