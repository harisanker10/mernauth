function ProfileCard({ user }) {
  return (
    <div className="flex w-full flex-col items-center p-4">
      <div className="my-2 w-20 h-20 overflow-hidden rounded-full">
        <img
          className="h-full w-full object-cover"
          src={
            user.avatar ? user.avatar : "https://i.stack.imgur.com/l60Hf.png"
          }
          alt="Profile Picture"
        />
      </div>
      <h1 className="text-2xl">{user?.fullname}</h1>
      <h2 className="text-base font-bold">@{user?.username}</h2>
    </div>
  );
}

export default ProfileCard;
