import React, { useState, useEffect } from "react";
import { FaThList, FaThLarge } from "react-icons/fa";
import UserSelector from "./components/UserSelector";
import ClaimButton from "./components/ClaimButton";
import { fetchLeaderboard, addUser } from "./api";
import TopThree from "./components/TopThree";
import LeaderboardList from "./components/LeaderboardList";

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [message, setMessage] = useState("");
  const [claimedPoints, setClaimedPoints] = useState(null); // lifted state
  const [view, setView] = useState("list");

  const loadLeaderboard = async () => {
    const res = await fetchLeaderboard();
    setLeaderboard(res.data);
    if (!selectedUserId && res.data.length > 0) {
      setSelectedUserId(res.data[0]._id);
    }
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const handleUserSelect = (userId) => {
    setClaimedPoints(null); // Clear claim message when user changes
    setMessage("");
    setSelectedUserId(userId);
  };

  const handleClaimSuccess = () => {
    loadLeaderboard();
  };

  const handleAddUser = async () => {
    if (!newUserName.trim()) return;
    try {
      await addUser(newUserName.trim());
      setNewUserName("");
      setMessage("✅ User added successfully!");
      setClaimedPoints(null); // clear any previous claim message
      await loadLeaderboard();
    } catch (err) {
      console.error("Error adding user:", err);
      setMessage("❌ Failed to add user");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const toggleView = () => {
    setView((prev) => (prev === "list" ? "grid" : "list"));
  };

  const topThree = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);
  const selectedUser = leaderboard.find((u) => u._id === selectedUserId);

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">⚡ Leaderboard</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* User Select and Claim */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <UserSelector
            users={leaderboard}
            selectedUserId={selectedUserId}
            onSelectUser={handleUserSelect}
            newUserName={newUserName}
            setNewUserName={setNewUserName}
            onAddUser={handleAddUser}
          />
           {message && <p className="text-center text-green-600 mt-2">{message}</p>}
          <ClaimButton
            userId={selectedUserId}
            username={selectedUser ? selectedUser.name : ""}
            onClaimSuccess={handleClaimSuccess}
            claimedPoints={claimedPoints}
            setClaimedPoints={setClaimedPoints}
          />
        </div>

        {/* Icon Toggle Button */}
        <div className="flex justify-end">
          <button
            onClick={toggleView}
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center justify-center"
            aria-label={`Switch to ${view === "list" ? "Grid" : "List"} View`}
            title={`Switch to ${view === "list" ? "Grid" : "List"} View`}
          >
            {view === "list" ? <FaThLarge size={20} /> : <FaThList size={20} />}
          </button>
        </div>

        {/* Top 3 */}
        <TopThree
          users={topThree}
          selectedUserId={selectedUserId}
          onSelectUser={handleUserSelect}
        />

        {/* Leaderboard List/Grid */}
        <LeaderboardList
          users={others}
          startRank={4}
          selectedUserId={selectedUserId}
          onSelectUser={handleUserSelect}
          layout={view}
        />
      </div>
    </div>
  );
}

export default App;
