const images = ['images/imagem1.jpg', 'images/imagem2.jpg', 'images/imagem3.jpg', 'images/imagem4.jpg', 'images/imagem5.jpg'];
let currentImageIndex = 0;
const puzzleContainer = document.getElementById('puzzle-container');
const message = document.getElementById('message');
const nextButton = document.getElementById('next');
let selectedPiece = null; // A peça atualmente selecionada

// Função para criar as peças do quebra-cabeça
function createPuzzle(imageSrc) {
    const pieces = [];
    const size = 4; // 4x4 grid
    puzzleContainer.innerHTML = ''; // Limpa o contêiner
    message.style.display = 'none'; // Esconde a mensagem
    nextButton.style.display = 'none'; // Esconde o botão de próxima imagem

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const piece = document.createElement('div');
            piece.className = 'piece';
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundPosition = `-${j * 75}px -${i * 100}px`;
            piece.dataset.position = `${i}-${j}`; // Armazena a posição correta
            piece.dataset.currentPosition = `${i}-${j}`; // Inicialmente, a posição atual é a correta

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
                    checkIfSolved(); // Verifica se o quebra-cabeça foi resolvido
                }
            });

            pieces.push(piece);
        }
    }

    // Embaralha as peças
    pieces.sort(() => Math.random() - 0.5);

    pieces.forEach(piece => puzzleContainer.appendChild(piece));
}

// Função para trocar as peças
function swapPieces(piece1, piece2) {
    const tempBackground = piece1.style.backgroundImage;
    const tempPosition = piece1.style.backgroundPosition;
    const tempDataPosition = piece1.dataset.currentPosition;

    piece1.style.backgroundImage = piece2.style.backgroundImage;
    piece1.style.backgroundPosition = piece2.style.backgroundPosition;
    piece1.dataset.currentPosition = piece2.dataset.currentPosition;

    piece2.style.backgroundImage = tempBackground;
    piece2.style.backgroundPosition = tempPosition;
    piece2.dataset.currentPosition = tempDataPosition;
}

// Função para verificar se o quebra-cabeça está resolvido
function checkIfSolved() {
    const pieces = document.querySelectorAll('.piece');
    let isSolved = true;

    pieces.forEach(piece => {
        const currentPosition = piece.dataset.currentPosition;
        const correctPosition = piece.dataset.position;

        if (currentPosition !== correctPosition) {
            isSolved = false;
        }
    });

    if (isSolved) {
        message.style.display = 'block'; // Mostra a mensagem de parabéns
        nextButton.style.display = 'block'; // Mostra o botão para a próxima imagem
    }
}

// Event listener para o botão de próxima imagem
nextButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    createPuzzle(images[currentImageIndex]);
});

// Event listener para o botão de reinício
document.getElementById('reset').addEventListener('click', () => {
    createPuzzle(images[currentImageIndex]); // Reinicia a imagem atual
});

// Cria o quebra-cabeça inicial
createPuzzle(images[currentImageIndex]);
