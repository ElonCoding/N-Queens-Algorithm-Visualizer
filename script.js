class NQueensVisualizer {
    constructor() {
        this.board = [];
        this.N = 5;
        this.solutions = [];
        this.currentSolution = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.speed = 500;
        this.attempts = 0;
        this.currentRow = 0;
        this.animationQueue = [];
        this.currentAnimation = null;
        
        // DOM elements
        this.boardElement = document.getElementById('board');
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.boardSizeSelect = document.getElementById('board-size');
        this.speedSelect = document.getElementById('speed');
        this.solutionsCountElement = document.getElementById('solutions-count');
        this.currentRowElement = document.getElementById('current-row');
        this.attemptsCountElement = document.getElementById('attempts-count');
        this.solutionsContainer = document.getElementById('solutions-container');
        
        this.initializeEventListeners();
        this.initializeBoard();
    }
    
    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.startVisualization());
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.resetBtn.addEventListener('click', () => this.resetVisualization());
        this.boardSizeSelect.addEventListener('change', () => this.changeBoardSize());
        this.speedSelect.addEventListener('change', () => this.changeSpeed());
    }
    
    initializeBoard() {
        this.N = parseInt(this.boardSizeSelect.value);
        this.board = Array.from({ length: this.N }, () => Array(this.N).fill('.'));
        this.renderBoard();
        this.updateStats();
    }
    
    renderBoard() {
        this.boardElement.innerHTML = '';
        this.boardElement.style.gridTemplateColumns = `repeat(${this.N}, 1fr)`;
        
        for (let row = 0; row < this.N; row++) {
            for (let col = 0; col < this.N; col++) {
                const cell = document.createElement('div');
                cell.className = `cell cell--${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                if (this.board[row][col] === 'Q') {
                    cell.classList.add('cell--queen');
                    cell.textContent = '♛';
                }
                
                this.boardElement.appendChild(cell);
            }
        }
    }
    
    async startVisualization() {
        if (this.isRunning && !this.isPaused) return;
        
        if (this.isPaused) {
            this.isPaused = false;
            this.startBtn.textContent = 'Pause';
            this.pauseBtn.textContent = 'Pause';
            this.processAnimationQueue();
            return;
        }
        
        this.isRunning = true;
        this.isPaused = false;
        this.startBtn.textContent = 'Pause';
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.resetBtn.disabled = true;
        
        this.solutions = [];
        this.currentSolution = 0;
        this.attempts = 0;
        this.currentRow = 0;
        this.animationQueue = [];
        
        this.solutionsContainer.innerHTML = '';
        
        // Start the algorithm
        await this.solveNQueens();
        
        this.isRunning = false;
        this.startBtn.textContent = 'Start Visualization';
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.resetBtn.disabled = false;
    }
    
    async solveNQueens() {
        this.board = Array.from({ length: this.N }, () => Array(this.N).fill('.'));
        this.renderBoard();
        
        await this.solve(0);
        
        console.log(`Total Solutions: ${this.solutions.length}`);
    }
    
    async solve(row) {
        if (row === this.N) {
            // Found a solution
            this.solutions.push(JSON.parse(JSON.stringify(this.board)));
            this.updateStats();
            this.displaySolution(this.board);
            await this.delay(1000);
            return;
        }
        
        this.currentRow = row;
        this.updateStats();
        
        for (let col = 0; col < this.N; col++) {
            if (this.isPaused) {
                await this.waitForResume();
            }
            
            this.attempts++;
            this.updateStats();
            
            // Visualize current position being tested
            await this.highlightCell(row, col, 'current');
            await this.delay(this.speed);
            
            if (this.isSafe(row, col)) {
                // Place queen
                this.board[row][col] = 'Q';
                await this.placeQueen(row, col);
                await this.delay(this.speed);
                
                // Recursively solve for next row
                await this.solve(row + 1);
                
                // Backtrack
                this.board[row][col] = '.';
                await this.removeQueen(row, col);
                await this.delay(this.speed);
            } else {
                // Show conflict
                await this.highlightCell(row, col, 'unsafe');
                await this.delay(this.speed / 2);
                await this.unhighlightCell(row, col);
            }
        }
    }
    
    isSafe(row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (this.board[i][col] === 'Q') return false;
        }
        
        // Check upper-left diagonal
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (this.board[i][j] === 'Q') return false;
        }
        
        // Check upper-right diagonal
        for (let i = row - 1, j = col + 1; i >= 0 && j < this.N; i--, j++) {
            if (this.board[i][j] === 'Q') return false;
        }
        
        return true;
    }
    
    async placeQueen(row, col) {
        const cell = this.getCell(row, col);
        cell.textContent = '♛';
        cell.classList.add('cell--queen');
        await this.delay(100);
    }
    
    async removeQueen(row, col) {
        const cell = this.getCell(row, col);
        cell.textContent = '';
        cell.classList.remove('cell--queen');
        await this.delay(100);
    }
    
    async highlightCell(row, col, type) {
        const cell = this.getCell(row, col);
        cell.classList.add(`cell--${type}`);
    }
    
    async unhighlightCell(row, col) {
        const cell = this.getCell(row, col);
        cell.classList.remove('cell--current', 'cell--safe', 'cell--unsafe');
    }
    
    getCell(row, col) {
        return this.boardElement.children[row * this.N + col];
    }
    
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async waitForResume() {
        return new Promise(resolve => {
            const checkPause = () => {
                if (!this.isPaused) {
                    resolve();
                } else {
                    setTimeout(checkPause, 100);
                }
            };
            checkPause();
        });
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        this.startBtn.textContent = this.isPaused ? 'Resume' : 'Pause';
        this.pauseBtn.textContent = this.isPaused ? 'Resume' : 'Pause';
    }
    
    resetVisualization() {
        this.isRunning = false;
        this.isPaused = false;
        this.solutions = [];
        this.currentSolution = 0;
        this.attempts = 0;
        this.currentRow = 0;
        this.animationQueue = [];
        
        this.startBtn.textContent = 'Start Visualization';
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.resetBtn.disabled = false;
        
        this.solutionsContainer.innerHTML = '';
        this.initializeBoard();
    }
    
    changeBoardSize() {
        if (this.isRunning) return;
        this.N = parseInt(this.boardSizeSelect.value);
        this.resetVisualization();
    }
    
    changeSpeed() {
        this.speed = parseInt(this.speedSelect.value);
    }
    
    updateStats() {
        this.solutionsCountElement.textContent = this.solutions.length;
        this.currentRowElement.textContent = this.currentRow + 1;
        this.attemptsCountElement.textContent = this.attempts;
    }
    
    displaySolution(board) {
        const solutionBoard = document.createElement('div');
        solutionBoard.className = 'solution-board';
        solutionBoard.style.gridTemplateColumns = `repeat(${this.N}, 1fr)`;
        
        for (let row = 0; row < this.N; row++) {
            for (let col = 0; col < this.N; col++) {
                const cell = document.createElement('div');
                cell.className = `solution-cell solution-cell--${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                
                if (board[row][col] === 'Q') {
                    cell.classList.add('solution-cell--queen');
                    cell.textContent = '♛';
                }
                
                solutionBoard.appendChild(cell);
            }
        }
        
        this.solutionsContainer.appendChild(solutionBoard);
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new NQueensVisualizer();
});