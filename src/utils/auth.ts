export const decodeJwt = (token: string) => {
  try {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload); // Decode base64
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export const isAdminOrAuthor = (token: string) => {
  const decodedToken = decodeJwt(token);
  if (
    decodedToken &&
    (decodedToken.role === "ADMIN" || decodedToken.role === "AUTHOR")
  ) {
    return true;
  }
  return false;
};
