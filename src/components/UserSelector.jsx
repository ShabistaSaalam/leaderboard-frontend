import React from "react";

export default function UserSelector({
  users,
  selectedUserId,
  onSelectUser,
  newUserName,
  setNewUserName,
  onAddUser
}) {
  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <label className="block mb-1 font-medium text-gray-700">Select a User</label>
      <select
        value={selectedUserId ?? ""}
        onChange={(e) => onSelectUser(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          -- Select a user --
        </option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <div className="mt-4 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Add new user"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onAddUser}
          disabled={!newUserName.trim()}
          className={`flex-1 min-w-[150px] px-4 py-2 rounded font-semibold text-white transition-colors ${
            !newUserName.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 "
          }`}
        >
          Add
        </button>
      </div>
    </div>
  );
}
