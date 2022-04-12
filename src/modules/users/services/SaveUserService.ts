interface Credential {
 user: string;
 password: string;
}

export function saveUserService(credential: Credential): void {
  const usersStorage = localStorage.getItem("@ELOCHALLENGE-CREDENTIALS");
  const users: Credential[] = usersStorage ? JSON.parse(usersStorage) : [];
  
  const userAlreadyExist = users.some(({ user }) => user === credential.user);
  if (userAlreadyExist) throw new Error("Usuário já existe no local storage!");

  users.push(credential);
  localStorage.setItem("@ELOCHALLENGE-CREDENTIALS", JSON.stringify(users));
}