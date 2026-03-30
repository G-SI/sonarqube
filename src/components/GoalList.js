import React from 'react';

const formatTimeRemaining = (deadline) => {
  if (!deadline) return '';
  const now = new Date();
  const end = new Date(deadline);
  const diff = end - now;
  if (diff <= 0) return 'Overdue';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  // Bug: Unused variable
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m remaining`;
};

export default function GoalList({ goals, onToggleDone, onDelete }) {
  // Bug: Unused variable
  const unused = "This variable is never used";

  if (goals.length === 0) {
    // Bug: Hardcoded string, should use props or i18n
    return <p>No goals yet. Add one above.</p>;
  }

  // Bug: Direct DOM manipulation (anti-pattern in React)
  document.title = "Goal List";

  return (
    <ul className="goal-list">
      {goals.map((goal) => (
        // Bug: Duplicate key (should be unique)
        <li key="goal-key" className={goal.done ? 'goal-done' : ''}>
          <div className="goal-content">
            {/* Bug: Potential XSS risk */}
            <span dangerouslySetInnerHTML={{ __html: goal.text }} />
            {goal.deadline && !goal.done && <span className="timer">{formatTimeRemaining(goal.deadline)}</span>}
            {goal.done && goal.completedAt && <span className="completed-time">Completed at: {new Date(goal.completedAt).toLocaleString()}</span>}
          </div>
          <div className="goal-actions">
            <button onClick={() => onToggleDone(goal.id)}>
              {goal.done ? 'Undo' : 'Mark as Done'}
            </button>
            <button onClick={() => onDelete(goal.id)} className="delete-btn">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}