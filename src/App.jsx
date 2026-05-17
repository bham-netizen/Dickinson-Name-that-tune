import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function NameThatTuneDeluxe() {
  const categories = [
    { name: "Movie Hits", songs: ["Saturday Night Fever/the Bee Gees", "Rocky III/Survivor", "Risky Business/Bob Seger", "Beaches/Bette Midler", "Caddyshack/Kenny Loggins"] },
    { name: "5 Second Rule", songs: ["Margaritaville by Jimmy Buffet", "Jump by Van Halen", "Hey There Delilah by Plain White Ts", "Summer of '69 by Bryan Adams", "Spirit in the Sky by Norman Greenbaum"] },
    { name: "Top Ten??", songs: ["Fireflies by Owl City #1 in 2009", "Breakfast at Tiffany's by Deep Blue Something #5 in 1995", "Informer by Snoa #3 in 1993", "Thong Song by Sisqo #3 in 2000", "Lips of an Angel by Hinder #3 in 2006"] },
    { name: "Celebrities", songs: ["I'm Just Ken sung by Ryan Gosling", "Good Vibrations sung by Mark Wahlberg", "Party All the Time sung by Eddie Murphy", "Heartbeat sung by Don Johnson", "Respect Yourself sung by Bruce Willis"] },
    { name: "Today's Hits", songs: ["A Bar Song by Shaboozy", "Fortnight by Taylor Swift and Post Malone", "Choosin' Texas by Ella Langley", "Espresso by Sabrina Carpenter", "Good Luck, Babe! by Chappell Roan"] },
    { name: "Ham's Jams", songs: ["Wild Thing by Tone Loc", "Friends in Low Places by Garth Brooks", "In da Club by 50 cent", "Brown eyed Girl by Van Morrison", "It Wasn't Me by Shaggy"] },
  ];

  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [used, setUsed] = useState({});
  const [scores, setScores] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [teamNames, setTeamNames] = useState(["Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "Team 6", "Team 7", "Team 8", "Team 9", "Team 10", "Team 11", "Team 12"]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const openClue = (category, song, value, key) => {
    setSelected({ category, song, value, key });
    setRevealed(false);
  };

  const backToBoard = () => {
    if (selected) setUsed((prev) => ({ ...prev, [selected.key]: true }));
    setSelected(null);
    setRevealed(false);
  };

  const adjustScore = (teamIndex, amount) => {
    setScores((prev) => prev.map((score, i) => (i === teamIndex ? score + amount : score)));
  };

  const toggleTimer = () => {
    if (timeLeft === 0) setTimeLeft(30);
    setTimerRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimeLeft(30);
  };

  const resetGame = () => {
    const sure = window.confirm("Reset used clues and scores?");
    if (!sure) return;
    setUsed({});
    setScores([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setSelected(null);
    setRevealed(false);
    resetTimer();
  };

  if (showFinal) {
    return (
      <div className="page clue-page">
        <div className="top-center">
          <div className="badge">Final Jeopardy • Movie Themes</div>
          <h1>FINAL JEOPARDY</h1>
          <p>Play the song on your separate audio device, then reveal the answer.</p>
        </div>
        <div className="clue-card">
          <div className="audio-box">
            <h2>PLAY AUDIO CLIP</h2>
            <div className="muted">Category: Movie Themes</div>
          </div>
          {!revealed ? (
            <button onClick={() => setRevealed(true)} className="big-button">Reveal Answer</button>
          ) : (
            <div className="answer-box">
              <div className="answer-label">Correct Answer</div>
              <div className="answer-text">Pirates of the Caribbean</div>
            </div>
          )}
        </div>
        <div className="bottom-actions">
          <button onClick={() => { setShowFinal(false); setRevealed(false); }} className="big-button secondary">Back to Board</button>
        </div>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="page clue-page">
        <div className="top-center">
          <div className="badge">{selected.category} • ${selected.value}</div>
          <h1>NAME THAT TUNE</h1>
          <p>Play the song on your separate audio device, then reveal the answer.</p>
        </div>
        <div className="clue-card">
          <div className="audio-box">
            <h2>PLAY AUDIO CLIP</h2>
            <div className="muted">Use your phone, Spotify playlist, iPad, or second device for this clue.</div>
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
        <div className="score-grid clue-score-grid five-team-grid">
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
                <button key={key} disabled={used[key]} onClick={() => openClue(category.name, song, value, key)} className={used[key] ? "tile used" : "tile"}>
                  {used[key] ? "USED" : value}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="score-grid board-score-grid five-team-grid">
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

      <div className="feature-row three-feature-row">
        <div onClick={() => { setShowFinal(true); setRevealed(false); }} style={{ cursor: "pointer" }}>
          <div>Final Jeopardy</div>
          <div style={{ fontSize: "26px", marginTop: "10px" }}>Movie Themes</div>
        </div>
        <div>
          <div>Timer: {timeLeft}s</div>
          <div style={{ marginTop: "10px", display: "flex", gap: "8px", justifyContent: "center" }}>
            <button onClick={toggleTimer} className="timer-button">{timerRunning ? "Pause" : "Start"}</button>
            <button onClick={resetTimer} className="timer-button">Reset</button>
          </div>
        </div>
        <div onClick={resetGame} style={{ cursor: "pointer" }}>
          <div>Reset Game</div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<NameThatTuneDeluxe />);
