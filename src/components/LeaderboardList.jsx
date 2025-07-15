export default function LeaderboardList({
  users,
  startRank = 1,
  selectedUserId,
  onSelectUser,
  layout = "grid", // or "grid"
}) {
  if (layout === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto p-4">
        {users.map((user) => (
          <div
            key={user._id}
            className={` bg-white shadow-md rounded-xl p-4 text-center transition-colors ${user._id === selectedUserId ? "bg-green-200" : ""
              }`}
          >
            <img
              className="mx-auto rounded-full w-16 h-16 mb-2"
              src={`https://robohash.org/${encodeURIComponent(user.name)}.png?size=128x128`}
              alt={user.name}
            />
            <h3 className="font-semibold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.totalPoints}⚡</p>
          </div>
        ))}
      </div>

    );
  }

  // Original list layout
  return (
    <ul className="max-w-4xl mx-auto bg-white rounded-xl shadow divide-y divide-gray-200">
      {users.map((user, index) => (
        <li
          key={user._id}
          className={`flex items-center p-4  transition-colors ${user._id === selectedUserId ? "bg-green-200" : ""
              }`}
        >
          <div className="w-8 text-center font-semibold text-gray-600">
            {startRank + index}
          </div>
          <div className="flex-shrink-0 ml-4">
            <img
              className="rounded-full w-12 h-12"
              src={`https://robohash.org/${encodeURIComponent(user.name)}.png?size=128x128`}
              alt={user.name}
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="font-semibold">{user.name}</p>
          </div>
          <div className="font-bold text-blue-600">{user.totalPoints}⚡</div>
        </li>
      ))}
    </ul>
  );
}
