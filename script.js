const images = ['images/imagem1.jpg', 'images/imagem2.jpg', 'images/imagem3.jpg', 'images/imagem4.jpg', 'images/imagem5.jpg'];
const puzzleContainer = document.getElementById('puzzle-container');
const correctCountElement = document.getElementById('correct-count');

let selectedPiece = null;

function createPuzzle(imageSrc) {
    const pieces = [];
    const rows = 5; // 5 linhas
    const cols = 5; // 5 colunas
    puzzleContainer.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const piece = document.createElement('div');
            piece.className = 'piece';
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundPosition = `-${j * 60}px -${i * 80}px`; // Ajuste de acordo com a nova largura e altura
            piece.dataset.index = i * cols + j; // Define o índice correto baseado na posição

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
    pieces.sort(() => Math.random() - 0.5);
    pieces.forEach(piece => puzzleContainer.appendChild(piece));

    updateCorrectCount(); // Conta peças corretas ao iniciar
}

function swapPieces(piece1, piece2) {
    const tempBackground = piece1.style.backgroundImage;
    const tempPosition = piece1.style.backgroundPosition;
    const tempIndex = piece1.dataset.index;

    piece1.style.backgroundImage = piece2.style.backgroundImage;
    piece1.style.backgroundPosition = piece2.style.backgroundPosition;
    piece1.dataset.index = piece2.dataset.index;

    piece2.style.backgroundImage = tempBackground;
    piece2.style.backgroundPosition = tempPosition;
    piece2.dataset.index = tempIndex;
}

// Função para contar quantas peças estão no lugar correto
function updateCorrectCount() {
    let correctCount = 0;

    document.querySelectorAll('.piece').forEach(piece => {
        if (parseInt(piece.dataset.index) === Array.from(puzzleContainer.children).indexOf(piece)) {
            correctCount++; // Incrementa se a peça estiver no lugar correto
        }
    });

    correctCountElement.textContent = `Peças corretas: ${correctCount}`; // Atualiza o texto

    // Verifica se todas as peças estão corretas
    if (correctCount === 25) {
        document.getElementById('next').style.display = 'block'; // Exibe o botão
    } else {
        document.getElementById('next').style.display = 'none'; // Esconde o botão
    }
}

// Event listener para o botão de próxima foto
document.getElementById('next').addEventListener('click', () => {
    // Aqui você pode adicionar a lógica para carregar a próxima imagem
    alert("Aqui você pode implementar a lógica para carregar o próximo quebra-cabeça!");
});

// Event listener para o botão de reinício
document.getElementById('reset').addEventListener('click', () => {
    createPuzzle(images[0]); // Altere para selecionar outra imagem, se desejado
});

// Cria o quebra-cabeça inicial
createPuzzle(images[0]);
