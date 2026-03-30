import React, { useState } from 'react';

export default function GoalInput({ onAdd }) {
  const [value, setValue] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value, deadline);
    setValue('');
    setDeadline('');
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter' && value.trim()) {
      handleAdd();
    }
  };

  return (
    <div className="goal-input">
      <input
        type="text"
        placeholder="Add new goal"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleEnter}
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
