export default function getImageUrl(userList, name) {
  const user = userList.filter((user) => {
    if (user.username === name) return user;
  });
  return user && user[0] && user[0].url;
}