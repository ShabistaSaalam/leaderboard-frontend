import React, { useState } from "react";
import { claimPoints } from "../api";

export default function ClaimButton({
  userId,
  username,
  onClaimSuccess,
  claimedPoints,
  setClaimedPoints
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClaim = async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await claimPoints(userId);
      setClaimedPoints(res.data.points); // lift claim message
      onClaimSuccess();
    } catch (err) {
      setError("Failed to claim points");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 flex flex-col items-center">
      <button
        onClick={handleClaim}
        disabled={loading || !userId}
        className={`px-4 py-2 rounded font-semibold text-white transition-colors ${
          loading || !userId
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Claiming..." : "Claim Points"}
      </button>

      {claimedPoints !== null && (
        <p className="mt-2 text-green-600">
          {username} claimed {claimedPoints} point{claimedPoints > 1 ? "s" : ""}!
        </p>
      )}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
}
