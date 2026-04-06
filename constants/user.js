export const USERS = [
  {
    studentNumber: "02000340320",
    password: "password123",
    name: "Mitzie Guligado",
  },
];

export function validateUser(studentNumber, password) {
  const found = USERS.find(
    (u) =>
      u.studentNumber === studentNumber &&
      u.password === password
  );

  return found || null;
}