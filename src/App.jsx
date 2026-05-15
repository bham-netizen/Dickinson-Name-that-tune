import { useState } from "react";
    setSelected(null);
    setRevealed(false);
  };

  if (selected) {
    return (
      <div className="page clue-page">
        <div className="top-center">
          <div className="badge">{selected.category} • ${selected.value}</div>
          <h1>NAME THAT TUNE</h1>
          <p>Play your audio clip, then reveal the answer.</p>
        </div>

        <div className="clue-card">
          <div className="audio-box">
            <h2>AUDIO CLIP</h2>
            {audioUrls[selected.key] ? (
              <div className="audio-loaded">
                <div className="audio-url">Saved audio URL: {audioUrls[selected.key]}</div>
                <audio controls src={audioUrls[selected.key]} />
              </div>
            ) : (
              <div className="muted">No audio URL saved yet for this clue.</div>
            )}

            <input
              value={audioUrls[selected.key] || ""}
              onChange={(e) => saveAudioUrl(selected.key, e.target.value)}
              placeholder="Paste direct MP3/WAV/M4A link here"
              className="audio-input"
            />
            <div className="hint">You can also use a separate device for music and leave this blank.</div>
          </div>

          {!revealed ? (
            <button onClick={() => setRevealed(true)} className="big-button">Reveal Answer</button>
          ) : (
            <div className="answer-box">
              <div className="answer-label">Correct Answer</div>
              <div className="answer-text">{selected.song}</div>
            </div>
          )}
        </div>

        <div className="score-grid clue-score-grid">
          {teamNames.map((team, i) => (
            <div key={`${team}-${i}`} className="score-card">
              <div className="team-name-static">{team}</div>
              <div className="score-number">{scores[i]}</div>
              <div className="score-buttons">
                <button onClick={() => adjustScore(i, selected.value)} className="plus">+{selected.value}</button>
                <button onClick={() => adjustScore(i, -selected.value)} className="minus">-{selected.value}</button>
              </div>
            </div>
          ))}
        </div>

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
createRoot(document.getElementById("root")).render(<NameThatTuneDeluxe />);
