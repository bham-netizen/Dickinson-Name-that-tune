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
  const [teamNames, setTeamNames] = useState(["Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "Team 6", "Team 7", "Team 8"]);
  const [audioUrls, setAudioUrls] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nameThatTuneAudioUrls")) || {};
    } catch {
      return {};
    }
  });

  const saveAudioUrl = (key, url) => {
    const updated = { ...audioUrls, [key]: url };
    setAudioUrls(updated);
    localStorage.setItem("nameThatTuneAudioUrls", JSON.stringify(updated));
  };

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
          <div className="badge">{selected.category} • ${selected.value}</div>
          <h1>NAME THAT TUNE</h1>
          <p>Play your audio clip, then reveal the answer.</p>
        </div>

        <div className="clue-card">
          <div className="audio-box">
            <h2>AUDIO CLIP</h2>
createRoot(document.getElementById("root")).render(<NameThatTuneDeluxe />);
