import { http } from "msw";
import { withDelay } from "@/mocks/utils/with-delay";
import { faker } from "@faker-js/faker";
import { UserModel } from "@/interfaces/models/User";

const STORAGE_KEY = "users";

function createInitialUsers(): UserModel[] {
  return Array.from({ length: 10 }).map(() => {
    const email = faker.internet.email().toLowerCase();

    return {
      id: faker.string.uuid(),
      userName: email,
      email,
      emailConfirmado: faker.datatype.boolean(0.8),
      bloqueado: faker.datatype.boolean(0.1),
    };
  });
}

function getUsers(): UserModel[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    const initial = createInitialUsers();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  return JSON.parse(data);
}

function saveUsers(data: UserModel[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function populateUsers(count = 5): UserModel[] {
  const existing = getUsers();

  const newUsers = Array.from({ length: count }).map(() => {
    const email = faker.internet.email().toLowerCase();

    return {
      id: faker.string.uuid(),
      userName: email,
      email,
      emailConfirmado: faker.datatype.boolean(0.8),
      bloqueado: faker.datatype.boolean(0.1),
    };
  });

  const merged = [...existing, ...newUsers];

  saveUsers(merged);

  return merged;
}

export const getUsersHandler = http.get(
  "*/users",
  withDelay(async () => {
    return Response.json(getUsers(), { status: 200 });
  }),
);

export const inviteUserHandler = http.post(
  "*/invite-user/:email",
  withDelay(async () => {
    return Response.json(null, { status: 200 });
  }),
);

export const usersHandlers = [getUsersHandler, inviteUserHandler];
