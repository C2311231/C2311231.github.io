import { useState } from 'react'

function App() {
  return (
    <>
      <CanvasGameOfLife />
    </>
  )
}

export default App

import { useEffect, useRef } from "react";

function CanvasGameOfLife() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 800 * dpr;
    canvas.height = 400 * dpr;
    const game = new GameOfLife(Math.floor(100*(9/16)), Math.floor(100*(16/9)), canvas, 18, 50);
    let animationFrameId;

    // Example: simple animation loop
    const render = () => {
      game.updateBoard();
      game.drawBoard();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} className="absolute opacity-50 inset-0 z-0 w-full h-full" style={{ filter: "blur(3px)" }}/>;
}

class GameOfLife {
  constructor(rows, cols, canvas, speed = 1, margin = 50) {
    this.rows = rows + 2 * margin;
    this.cols = cols + 2 * margin;
    this.board = this.createBoard();
    this.canvas = canvas;
    this.speed = speed;
    this.lastUpdateTime = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.margin = margin;
    this.canvas.addEventListener("mousemove", this.hoverCell.bind(this));
  }

  createBoard() {
    return Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => Math.random() < 0.5 ? 1 : 0)
    );
  }

  updateBoard() {
    if (Date.now() - this.lastUpdateTime < 1000 / this.speed) return;
    this.lastUpdateTime = Date.now();
    const newBoard = this.board.map(arr => [...arr]);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const aliveNeighbors = this.countAliveNeighbors(row, col);
        if (this.board[row][col] == 1) {
          newBoard[row][col] = aliveNeighbors == 2 || aliveNeighbors == 3 ? 1 : 0;
        } else {
          newBoard[row][col] = aliveNeighbors == 3 || (aliveNeighbors == 2 & Math.random() > 0.995) ? 1 : 0;
        }
      }
    }

    
    const extendCreature = (x, y, depth = 0) => {
      if (depth > 10) return; // prevent infinite recursion

      const neighbors = this.getAliveNeighbors(y, x); // check row/col order
      if (neighbors.length === 8) {
        const [r, c] = neighbors[Math.floor(Math.random() * neighbors.length)];
        extendCreature(r, c, depth + 1);
        return;
      }

      const deadNeighbors = this.getDeadNeighbors(y, x);
      if (deadNeighbors.length > 0) {
        const [r, c] = deadNeighbors[Math.floor(Math.random() * deadNeighbors.length)];
        this.board[r][c] = 1;
      }
    };
    this.board = newBoard;
    if (this.board[this.mouseY][this.mouseX] == 1) {
      extendCreature(this.mouseX, this.mouseY);
    }
  }

  countAliveNeighbors(row, col) {
    return this.getAliveNeighbors(row, col).length;
  }
  
  getAliveNeighbors(row, col) {
    let neighbors = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i == 0 && j == 0) continue;
        const r = row + i;
        const c = col + j;
        if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
          if (this.board[r][c] == 1) {
            neighbors.push([r, c]);
          }
        }
      }
    }
    return neighbors;
  }

  getDeadNeighbors(row, col) {
    let neighbors = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i == 0 && j == 0) continue;
        const r = row + i;
        const c = col + j;
        if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
          if (this.board[r][c] == 0) {
            neighbors.push([r, c]);
          }
        }
      }
    }
    return neighbors;
  }

  drawBoard() {
    const ctx = this.canvas.getContext("2d");
    const cellSizeX = this.canvas.width / (this.cols-2*this.margin);
    const cellSizeY = this.canvas.height / (this.rows-2*this.margin);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let row = this.margin; row < this.rows-this.margin; row++) {
      for (let col = this.margin; col < this.cols-this.margin; col++) {
        ctx.fillStyle = this.board[row][col] === 1 ? "black" : "transparent";
        if (row === this.mouseY && col === this.mouseX) {
          ctx.fillStyle = "rgba(50, 50, 50, 0.8)";
        }
        ctx.fillRect((col-this.margin) * cellSizeX, (row-this.margin) * cellSizeY, cellSizeX, cellSizeY);
      }
    }
  }

  hoverCell(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const cellSizeX = rect.width / (this.cols-2*this.margin);
    const cellSizeY = rect.height / (this.rows-2*this.margin);
    const col = Math.floor(x / cellSizeX) + this.margin;
    const row = Math.floor(y / cellSizeY) + this.margin;
    this.mouseX = col;
    this.mouseY = row;
    console.log(this.mouseX, this.mouseY, row, col, cellSizeX, cellSizeY);
  }
}