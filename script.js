const images = ['images/imagem1.jpg', 'images/imagem2.jpg', 'images/imagem3.jpg', 'images/imagem4.jpg', 'images/imagem5.jpg'];
const puzzleContainer = document.getElementById('puzzle-container');
const correctCountElement = document.getElementById('correct-count');

let selectedPiece = null; // A peça atualmente selecionada
const size = 4; // Tamanho do grid (4x4)

// Função para criar as peças do quebra-cabeça
function createPuzzle(imageSrc) {
    const pieces = [];
    puzzleContainer.innerHTML = ''; // Limpa o contêiner

    // Criando as peças e atribuindo posição correta
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const piece = document.createElement('div');
            piece.className = 'piece';
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundPosition = `-${j * 75}px -${i * 100}px`;
            piece.dataset.correctIndex = i * size + j; // Atribui o índice correto da peça
            piece.dataset.currentIndex = i * size + j; // Atribui o índice atual da peça inicialmente

            // Adiciona evento de clique
            piece.addEventListener('click', () => {
                if (!selectedPiece) {
                    selectedPiece = piece; // Seleciona a peça
                    piece.style.border = '2px solid red'; // Destaque a peça selecionada
                } else {
                    // Troca as peças
                    swapPieces(selectedPiece, piece);
                    selectedPiece.style.border = ''; // Remove o destaque
                    selectedPiece = null; // Reseta a seleção
                    updateCorrectCount(); // Atualiza o contador após cada troca
                }
            });

            pieces.push(piece);
        }
    }

    // Embaralha as peças
    shuffleArray(pieces);

    // Define as posições atuais após o embaralhamento
    pieces.forEach((piece, index) => {
        piece.dataset.currentIndex = index; // Atualiza o índice atual
        puzzleContainer.appendChild(piece);
    });

    updateCorrectCount(); // Conta peças corretas ao iniciar
}

// Função para embaralhar as peças
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca as peças
    }
}

// Função para trocar as peças
function swapPieces(piece1, piece2) {
    // Troca os índices atuais
    const tempIndex = piece1.dataset.currentIndex;
    piece1.dataset.currentIndex = piece2.dataset.currentIndex;
    piece2.dataset.currentIndex = tempIndex;

    // Troca as posições das imagens
    const tempBackground = piece1.style.backgroundImage;
    const tempPosition = piece1.style.backgroundPosition;

    piece1.style.backgroundImage = piece2.style.backgroundImage;
    piece1.style.backgroundPosition = piece2.style.backgroundPosition;

    piece2.style.backgroundImage = tempBackground;
    piece2.style.backgroundPosition = tempPosition;
}

// Função para contar quantas peças estão no lugar correto
function updateCorrectCount() {
    let correctCount = 0;

    document.querySelectorAll('.piece').forEach(piece => {
        // Verifica se o índice correto é igual ao índice atual
        if (piece.dataset.correctIndex === piece.dataset.currentIndex) {
            correctCount++; // Incrementa se a peça estiver no lugar correto
        }
    });

    correctCountElement.textContent = `Peças corretas: ${correctCount}`; // Atualiza o texto do contador
}

// Event listener para o botão de reinício
document.getElementById('reset').addEventListener('click', () => {
    createPuzzle(images[0]); // Altere para selecionar outra imagem, se desejado
});

// Cria o quebra-cabeça inicial
createPuzzle(images[0]);
