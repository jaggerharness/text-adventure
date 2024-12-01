import { prisma } from "../prisma";
import { faker } from "@faker-js/faker";

async function clearDatabase() {
  await prisma.action.deleteMany();
  await prisma.node.deleteMany();
  await prisma.story.deleteMany();
  await prisma.user.deleteMany();
}

async function createUser() {
  return prisma.user.create({
    data: {
      id: "abc",
      email: faker.internet.email(),
      name: faker.person.fullName(),
    },
  });
}

async function createStory(userId: string) {
  return prisma.story.create({
    data: {
      title: faker.book.title(),
      description: faker.lorem.paragraph(),
      isAiGenerated: false,
      userId,
    },
  });
}

async function createNode(storyId: string, content: string) {
  return prisma.node.create({
    data: {
      content,
      storyId,
    },
  });
}

async function createAction(
  nodeId: string,
  action: string,
  nextNodeId?: string
) {
  return prisma.action.create({
    data: {
      action,
      nodeId,
      nextNodeId,
    },
  });
}

async function main() {
  try {
    await clearDatabase();

    const user = await createUser();
    const story = await createStory(user.id);

    const startNode = await createNode(story.id, faker.lorem.paragraphs());

    await prisma.story.update({
      where: { id: story.id },
      data: { startNodeId: startNode.id },
    });

    const startingActions = await Promise.all(
      Array.from({ length: 4 }).map(() =>
        createAction(startNode.id, faker.lorem.sentence())
      )
    );

    const storyNodes = await Promise.all(
      Array.from({ length: 4 }).map(async (_, index) => {
        const createdNode = await createNode(
          story.id,
          faker.lorem.paragraphs()
        );
        await prisma.action.update({
          where: { id: startingActions[index].id },
          data: { nextNodeId: createdNode.id },
        });
        return createdNode;
      })
    );

    const endNode = await createNode(story.id, faker.lorem.paragraphs());

    for (const storyNode of storyNodes) {
      await Promise.all(
        Array.from({ length: 4 }).map(() =>
          createAction(storyNode.id, faker.lorem.sentence(), endNode.id)
        )
      );
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
