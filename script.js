const images = ['images/imagem1.jpg', 'images/imagem2.jpg', 'images/imagem3.jpg', 'images/imagem4.jpg', 'images/imagem5.jpg'];
let currentImageIndex = 0; // Índice da imagem atual
const puzzleContainer = document.getElementById('puzzle-container');
const actionButton = document.getElementById('action-button');

let selectedPiece = null; // A peça atualmente selecionada

// Função para criar as peças do quebra-cabeça
function createPuzzle(imageSrc) {
    const pieces = [];
    const size = 4; // 4x4 grid

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const piece = document.createElement('div');
            piece.className = 'piece';
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundPosition = `-${j * 75}px -${i * 100}px`; // Ajuste para 75 e 100

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

    piece1.style.backgroundImage = piece2.style.backgroundImage;
    piece1.style.backgroundPosition = piece2.style.backgroundPosition;

    piece2.style.backgroundImage = tempBackground;
    piece2.style.backgroundPosition = tempPosition;
}

// Função para verificar se o quebra-cabeça foi completado
function isPuzzleComplete() {
    const pieces = document.querySelectorAll('.piece');
    for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const row = Math.floor(i / 4);
        const col = i % 4;
        const expectedPosition = `-${col * 75}px -${row * 100}px`;
        if (piece.style.backgroundPosition !== expectedPosition) {
            return false; // Se alguma peça não está na posição correta, o quebra-cabeça não está completo
        }
    }
    return true; // Todas as peças estão nas posições corretas
}

// Função para reiniciar o quebra-cabeça
function resetPuzzle() {
    puzzleContainer.innerHTML = ''; // Limpa as peças atuais
    createPuzzle(images[currentImageIndex]); // Carrega a próxima imagem
}

// Função para avançar para a próxima imagem ou reiniciar
function handleActionButton() {
    if (isPuzzleComplete()) {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++; // Avança para a próxima imagem
            actionButton.innerText = 'Recomeçar';
            resetPuzzle();
        } else {
            alert("Você completou todas as imagens! Voltar ao início.");
            currentImageIndex = 0; // Volta para a primeira imagem
            actionButton.innerText = 'Recomeçar';
            resetPuzzle();
        }
    } else {
        alert("O quebra-cabeça ainda está errado. Continue tentando!");
    }
}

// Event listener para o botão de ação
actionButton.addEventListener('click', handleActionButton);

// Cria o quebra-cabeça inicial
createPuzzle(images[currentImageIndex]);
