import { useState } from "react";

        <div className="bottom-actions">
          <button onClick={backToBoard} className="big-button secondary">Back to Board</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page board-page">
      <div className="header">
        <h1>NAME THAT TUNE</h1>
        <h2>Dickinson High School Showdown</h2>
      </div>

      <div className="board-grid">
        {categories.map((category) => (
          <div key={category.name} className="category-column">
            <div className="category-header">{category.name}</div>
            {category.songs.map((song, i) => {
              const value = (i + 1) * 100;
              const key = `${category.name}-${value}`;
              return (
                <button
                  key={key}
                  disabled={used[key]}
                  onClick={() => openClue(category.name, song, value, key)}
                  className={used[key] ? "tile used" : "tile"}
                >
                  {used[key] ? "USED" : value}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="score-grid board-score-grid">
        {teamNames.map((team, i) => (
          <div key={i} className="score-card">
            <input
              value={team}
              onChange={(e) => setTeamNames((prev) => prev.map((name, idx) => (idx === i ? e.target.value : name)))}
              className="team-input"
            />
            <div className="score-number">{scores[i]}</div>
          </div>
        ))}
      </div>

      <div className="feature-row">
        <div>Daily Double Placeholder</div>
        <div>Final Jeopardy Placeholder</div>
        <div>Timer Placeholder</div>
      </div>

      <div className="bottom-actions">
        <button onClick={resetGame} className="reset-button">Reset Game</button>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<NameThatTuneDeluxe />);
