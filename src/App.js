import React, { useState, useCallback } from 'react';
import GoalInput from './components/GoalInput';
import GoalList from './components/GoalList';
import './App.css';

export default function App() {
  const [goals, setGoals] = useState([]);

  const addGoal = useCallback((text, deadline) => {
    if (!text.trim()) return;
    const newGoal = {
      id: Date.now().toString(),
      text: text.trim(),
      done: false,
      deadline: deadline,
      completedAt: null,
    };
    setGoals((prev) => [...prev, newGoal]);
  }, []);

  const toggleGoalDone = useCallback((id) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, done: !goal.done, completedAt: !goal.done ? new Date().toISOString() : null } : goal
      )
    );
  }, []);

  const deleteGoal = useCallback((id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  }, []);

  const completedGoals = goals.filter(goal => goal.done);
  const uncompletedGoals = goals.filter(goal => !goal.done);

  return (
    <div className="app-container">
      <h1>Goal Manager</h1>
      <GoalInput onAdd={addGoal} />
      <h2>Uncompleted Goals</h2>
      <GoalList
        goals={uncompletedGoals}
        onToggleDone={toggleGoalDone}
        onDelete={deleteGoal}
      />
      <h2>Completed Goals</h2>
      <GoalList
        goals={completedGoals}
        onToggleDone={toggleGoalDone}
        onDelete={deleteGoal}
      />
    </div>
  );
}
