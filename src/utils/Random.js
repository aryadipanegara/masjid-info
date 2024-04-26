export const generateRandomText = (length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomText = "";
  for (let i = 0; i < length; i++) {
    randomText += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomText;
};
