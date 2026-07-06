"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button, Slider, Typography, Space, Card, Statistic, Row, Col, Tooltip } from "antd";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

// ===================== MAZE DEFINITION =====================

const ROWS = 8;
const COLS = 8;

// 0 = empty, 1 = wall
const MAZE_LAYOUT: number[][] = [
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const START_POS = { row: 0, col: 0 };
const CHEESE_POS = { row: 7, col: 7 };

// Actions: up, down, left, right
const ACTIONS = [
  [-1, 0], // up
  [1, 0],  // down
  [0, -1], // left
  [0, 1],  // right
];
const ACTION_LABELS = ["↑", "↓", "←", "→"];

// ===================== GAME COMPONENT =====================

export default function RlMaze() {
  // ---- Hyperparameters ----
  const [alpha, setAlpha] = useState(0.5);     // learning rate
  const [gamma, setGamma] = useState(0.9);     // discount factor
  const [epsilon, setEpsilon] = useState(0.2); // exploration rate
  const [speed, setSpeed] = useState(150);     // ms per step

  // ---- Game state ----
  const [mouseRow, setMouseRow] = useState(START_POS.row);
  const [mouseCol, setMouseCol] = useState(START_POS.col);
  const [episode, setEpisode] = useState(1);
  const [steps, setSteps] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lastAction, setLastAction] = useState<number | null>(null);
  const [mouseTrail, setMouseTrail] = useState<Set<string>>(new Set());

  // ---- Refs for mutable data (game loop needs latest values) ----
  const qTableRef = useRef<Map<string, number[]>>(new Map());
  const isRunningRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const episodeRef = useRef(1);
  const stepsRef = useRef(0);
  const rewardRef = useRef(0);
  const foundRef = useRef(0);

  // Keep refs in sync with state
  useEffect(() => { isRunningRef.current = isRunning; }, [isRunning]);

  // ---- Helper: get Q-values for a state ----
  const getQValues = useCallback((row: number, col: number): number[] => {
    const key = `${row},${col}`;
    if (!qTableRef.current.has(key)) {
      qTableRef.current.set(key, [0, 0, 0, 0]);
    }
    return qTableRef.current.get(key)!;
  }, []);

  // ---- Helper: choose action (epsilon-greedy) ----
  const chooseAction = useCallback((row: number, col: number, eps: number): number => {
    const qValues = getQValues(row, col);
    if (Math.random() < eps) {
      return Math.floor(Math.random() * 4);
    }
    const maxQ = Math.max(...qValues);
    const bestActions = qValues
      .map((q, i) => ({ q, i }))
      .filter((a) => a.q === maxQ)
      .map((a) => a.i);
    return bestActions[Math.floor(Math.random() * bestActions.length)];
  }, [getQValues]);

  // ---- Helper: take a step in the environment ----
  const step = useCallback((row: number, col: number, action: number) => {
    const [dr, dc] = ACTIONS[action];
    const newRow = row + dr;
    const newCol = col + dc;

    // Check bounds and walls
    if (
      newRow < 0 || newRow >= ROWS ||
      newCol < 0 || newCol >= COLS ||
      MAZE_LAYOUT[newRow][newCol] === 1
    ) {
      // Hit wall or boundary — stay in place, negative reward
      return { row, col, reward: -10 };
    }

    // Reached cheese?
    if (newRow === CHEESE_POS.row && newCol === CHEESE_POS.col) {
      return { row: newRow, col: newCol, reward: 100 };
    }

    // Normal step
    return { row: newRow, col: newCol, reward: -1 };
  }, []);

  // ---- Start / Stop training ----
  const toggleRunning = () => {
    if (isRunning) {
      setIsRunning(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    } else {
      setIsRunning(true);
    }
  };

  // ---- Reset everything ----
  const reset = () => {
    setIsRunning(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    qTableRef.current = new Map();
    setMouseRow(START_POS.row);
    setMouseCol(START_POS.col);
    setEpisode(1);
    setSteps(0);
    setTotalReward(0);
    setFoundCount(0);
    setLastAction(null);
    setMouseTrail(new Set());
    episodeRef.current = 1;
    stepsRef.current = 0;
    rewardRef.current = 0;
    foundRef.current = 0;
  };

  // ---- Game loop ----
  useEffect(() => {
    if (!isRunning) return;

    let currentRow = mouseRow;
    let currentCol = mouseCol;
    let currentSteps = stepsRef.current;
    let currentReward = rewardRef.current;
    let currentFound = foundRef.current;
    let currentEpisode = episodeRef.current;

    const loop = () => {
      if (!isRunningRef.current) return;

      const eps = epsilon;
      const action = chooseAction(currentRow, currentCol, eps);
      const result = step(currentRow, currentCol, action);
      const qValues = getQValues(currentRow, currentCol);
      const oldQ = qValues[action];

      // Q-learning update
      if (result.reward === 100) {
        // Terminal state (found cheese)
        const newQ = oldQ + alpha * (result.reward - oldQ);
        qValues[action] = newQ;
        currentFound++;
        currentReward += result.reward;

        // Сохраняем в ref, чтобы при перезапуске эффекта счётчик не сбросился
        foundRef.current = currentFound;
        rewardRef.current = currentReward;

        // Update state
        setMouseRow(result.row);
        setMouseCol(result.col);
        setLastAction(action);
        setTotalReward(currentReward);
        setSteps(currentSteps + 1);
        setFoundCount(currentFound);
        setMouseTrail((prev) => {
          const next = new Set(prev);
          next.add(`${result.row},${result.col}`);
          return next;
        });

        // Start new episode
        currentEpisode++;
        currentRow = START_POS.row;
        currentCol = START_POS.col;
        currentSteps = 0;
        setEpisode(currentEpisode);
        setMouseRow(START_POS.row);
        setMouseCol(START_POS.col);
        setSteps(0);
        setLastAction(null);
        setMouseTrail(new Set());
        episodeRef.current = currentEpisode;
        stepsRef.current = 0;

        timeoutRef.current = setTimeout(loop, speed);
      } else {
        // Normal step
        const nextQValues = getQValues(result.row, result.col);
        const maxNextQ = Math.max(...nextQValues);
        const newQ = oldQ + alpha * (result.reward + gamma * maxNextQ - oldQ);
        qValues[action] = newQ;

        currentRow = result.row;
        currentCol = result.col;
        currentSteps++;
        currentReward += result.reward;

        // Save to refs so counts survive effect restarts
        stepsRef.current = currentSteps;
        rewardRef.current = currentReward;
        episodeRef.current = currentEpisode;

        // Update state
        setMouseRow(currentRow);
        setMouseCol(currentCol);
        setLastAction(action);
        setSteps(currentSteps);
        setTotalReward(currentReward);
        setMouseTrail((prev) => {
          const next = new Set(prev);
          next.add(`${currentRow},${currentCol}`);
          return next;
        });

        timeoutRef.current = setTimeout(loop, speed);
      }
    };

    timeoutRef.current = setTimeout(loop, speed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isRunning, alpha, gamma, epsilon, speed, chooseAction, step, getQValues, mouseRow, mouseCol]);

  // ---- Render a single cell ----
  const renderCell = (row: number, col: number) => {
    const isWall = MAZE_LAYOUT[row][col] === 1;
    const isMouse = row === mouseRow && col === mouseCol;
    const isCheese = row === CHEESE_POS.row && col === CHEESE_POS.col;
    const isStart = row === START_POS.row && col === START_POS.col;
    const isVisited = mouseTrail.has(`${row},${col}`);

    let bg = "";
    if (isWall) bg = "bg-gray-700";
    else if (isMouse) bg = "bg-blue-500";
    else if (isCheese) bg = "bg-yellow-400";
    else if (isVisited) bg = "bg-blue-100";
    else bg = "bg-white";

    const border = "border border-gray-300";

    return (
      <div
        key={`${row}-${col}`}
        className={`${bg} ${border} flex items-center justify-center text-xl`
          .replace(/\s+/g, " ").trim()}
        style={{
          width: "100%",
          aspectRatio: "1",
          borderRadius: 4,
          transition: isMouse ? "background-color 0.15s" : undefined,
        }}
      >
        {isMouse && "🐭"}
        {isCheese && !isMouse && "🧀"}
        {isStart && !isMouse && !isCheese && "⬜"}
      </div>
    );
  };

  // ---- Render action heatmap on the side? Not needed, skip for simplicity ----

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🧀 Мышь ищет сыр</Title>
      <Text type="secondary" className="block mb-6">
        Агент обучается с помощью Q-learning находить сыр в лабиринте.
        Чем больше эпизодов — тем быстрее мышка находит цель.
      </Text>

      {/* Maze grid + Controls */}
      <Row gutter={[24, 24]}>
        {/* Grid */}
        <Col xs={24} md={14}>
          <Card>
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              }}
            >
              {Array.from({ length: ROWS * COLS }, (_, i) => {
                const row = Math.floor(i / COLS);
                const col = i % COLS;
                return renderCell(row, col);
              })}
            </div>

            {/* Action indicator */}
            <div className="text-center mt-4">
              {lastAction !== null && (
                <Text strong style={{ fontSize: 20 }}>
                  Действие: {ACTION_LABELS[lastAction]}
                </Text>
              )}
            </div>
          </Card>
        </Col>

        {/* Controls */}
        <Col xs={24} md={10}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {/* Hyperparameters */}
            <Card size="small" title="Параметры">
              <div className="mb-3">
                <Space>
                  <Text>α (learning rate): {alpha}</Text>
                  <Tooltip title="Насколько сильно новый опыт перезаписывает старый. 0 — агент ничего не учит. 1 — запоминает только последний шаг. Обычно ставят 0.1–0.5.">
                    <QuestionCircleOutlined style={{ color: "#1677ff", cursor: "help" }} />
                  </Tooltip>
                </Space>
                <Slider min={0.01} max={1} step={0.01} value={alpha} onChange={setAlpha} />
              </div>
              <div className="mb-3">
                <Space>
                  <Text>γ (discount): {gamma}</Text>
                  <Tooltip title="Насколько агент ценит будущие награды. 0 — живёт одним шагом. 0.9 — учитывает дальнейший путь. Чем ближе к 1, тем дальше видит.">
                    <QuestionCircleOutlined style={{ color: "#1677ff", cursor: "help" }} />
                  </Tooltip>
                </Space>
                <Slider min={0.1} max={1} step={0.1} value={gamma} onChange={setGamma} />
              </div>
              <div className="mb-3">
                <Space>
                  <Text>ε (exploration): {epsilon}</Text>
                  <Tooltip title="Вероятность случайного шага вместо лучшего известного. 0 — всегда идёт по памяти. 1 — хаос. Для обучения нужно 0.1–0.3, чтобы агент исследовал новые пути.">
                    <QuestionCircleOutlined style={{ color: "#1677ff", cursor: "help" }} />
                  </Tooltip>
                </Space>
                <Slider min={0} max={1} step={0.05} value={epsilon} onChange={setEpsilon} />
              </div>
              <div>
                <Space>
                  <Text>Speed: {speed}ms</Text>
                  <Tooltip title="Задержка между шагами в миллисекундах. 30 — быстро, 500 — медленно, чтобы разглядеть каждый шаг.">
                    <QuestionCircleOutlined style={{ color: "#1677ff", cursor: "help" }} />
                  </Tooltip>
                </Space>
                <Slider
                  min={30}
                  max={500}
                  step={10}
                  value={speed}
                  onChange={setSpeed}
                />
              </div>
            </Card>

            {/* Buttons */}
            <Space>
              <Button
                type="primary"
                icon={isRunning ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                onClick={toggleRunning}
                size="large"
              >
                {isRunning ? "Пауза" : "Старт"}
              </Button>
              <Button icon={<ReloadOutlined />} onClick={reset} size="large">
                Сброс
              </Button>
            </Space>

            {/* Buttons to try preset mazes — skip for simplicity */}

            {/* Keyboard hint */}
            <Text type="secondary" style={{ fontSize: 12 }}>
              Подсказка: ε = 0 — жадный алгоритм (всегда идёт по лучшему пути).
              ε = 1 — случайные движения.
            </Text>
          </Space>
        </Col>
      </Row>

      {/* Stats */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic title="Эпизод" value={episode} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic title="Шагов" value={steps} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic title="Наград" value={Math.round(totalReward)} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic title="Сыр найден" value={foundCount} suffix="раз" />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
