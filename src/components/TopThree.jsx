import React from "react";
const rankStyles = ["border-yellow-400", "border-gray-400", "border-orange-400"];
const rankEmojis = ["🥇", "🥈", "🥉"];

export default function TopThree({ users, selectedUserId, onSelectUser }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {users.map((user, i) => (
        <div
          key={user._id}
          className={` bg-white rounded-xl shadow-lg p-3 text-center border-4
            ${rankStyles[i]}
            transition-transform
            w-20 sm:w-24 md:w-28
            `}
        >
          <div className="text-xl sm:text-2xl">{rankEmojis[i]}</div>
          <img
            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 sm:mb-2"
            src={`https://robohash.org/${encodeURIComponent(user.name)}.png?size=128x128`}
            alt={user.name}
          />
          <div className="font-semibold text-xs sm:text-sm truncate">{user.name}</div>
          <div className="text-blue-600 font-bold mt-1 text-sm sm:text-base">{user.totalPoints}⚡</div>
        </div>
      ))}
    </div>
  );
}
