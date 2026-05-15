import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function NameThatTuneDeluxe() {
  const categories = [
    {
      name: "Movie Hits",
      songs: ["Stayin' Alive", "Eye of the Tiger", "Old Time Rock n Roll", "Wind Beneath My Wings", "I'm Alright"],
    },
    {
      name: "5 Second Rule",
      songs: ["Margaritaville", "Jump", "Hey There Delilah", "Summer of '69", "Spirit in the Sky"],
    },
    {
      name: "Top Ten??",
      songs: ["Fireflies", "Breakfast at Tiffany's", "Informer", "Thong Song", "Lips of an Angel"],
    },
    {
      name: "Celebrities",
      songs: ["I'm Just Ken", "Good Vibrations", "Party All the Time", "Heartbeat", "Respect Yourself"],
    },
    {
      name: "Today's Hits",
      songs: ["A Bar Song", "Fortnight", "Choosin' Texas", "Espresso", "Good Luck, Babe!"],
    },
    {
      name: "Ham's Jams",
      songs: ["Wild Thing", "Friends in Low Places", "In da Club", "It's Five O'Clock Somewhere", "It Wasn't Me"],
    },
  ];

  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [used, setUsed] = useState({});
  const [scores, setScores] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [teamNames, setTeamNames] = useState([
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
  ]);

  const openClue = (category, song, value, key) => {
    setSelected({ category, song, value, key });
    setRevealed(false);
  };

  const backToBoard = () => {
    if (selected) {
      setUsed((prev) => ({ ...prev, [selected.key]: true }));
    }
    setSelected(null);
    setRevealed(false);
  };

  const adjustScore = (teamIndex, amount) => {
    setScores((prev) => prev.map((score, i) => (i === teamIndex ? score + amount : score)));
  };

  const resetGame = () => {
    const sure = window.confirm("Reset used clues and scores?");
    if (!sure) return;
    setUsed({});
    setScores([0, 0, 0, 0, 0, 0, 0, 0]);
    setSelected(null);
    setRevealed(false);
  };

  if (selected) {
    return (
      <div className="page clue-page">
        <div className="top-center">
          <div className="badge">
            {selected.category} • ${selected.value}
          </div>
          <h1>NAME THAT TUNE</h1>
          <p>Play the song on your separate audio device, then reveal the answer.</p>
        </div>

        <div className="clue-card">
          <div className="audio-box">
            <h2>PLAY AUDIO CLIP</h2>
            <div className="muted">Use your phone, Spotify playlist, iPad, or second device for this clue.</div>
          </div>

          {!revealed ? (
            <button onClick={() => setRevealed(true)} className="big-button">
              Reveal Answer
            </button>
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
                <button onClick={() => adjustScore(i, selected.value)} className="plus">
                  +{selected.value}
                </button>
                <button onClick={() => adjustScore(i, -selected.value)} className="minus">
                  -{selected.value}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bottom-actions">
          <button onClick={backToBoard} className="big-button secondary">
            Back to Board
          </button>
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
        <button onClick={resetGame} className="reset-button">
          Reset Game
        </button>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<NameThatTuneDeluxe />);
