export const USERS = [
  {
    email: "student123@gmail.com",
    password: "password123",
    name: "Mitzie Guligado",
  },
];

export function validateUser(email, password) {
  const found = USERS.find(
    (u) =>
      u.email === email &&
      u.password === password
  );

  return found || null;
}