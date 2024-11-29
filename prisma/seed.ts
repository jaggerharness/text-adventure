import { prisma } from "../prisma";
import { faker } from "@faker-js/faker";

const users = Array.from({ length: 20 }).map(() => ({
  name: faker.internet.displayName(),
  email: faker.internet.exampleEmail(),
}));

async function main() {
  await prisma.user.createMany({ data: users });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
