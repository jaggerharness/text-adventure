import { prisma } from "../prisma";
import { faker } from "@faker-js/faker";

const users = Array.from({ length: 20 }).map(() => ({
  name: faker.internet.displayName(),
  email: faker.internet.exampleEmail(),
}));

async function main() {
  try {
    // Create users
    await prisma.user.createMany({ data: users });
    const createdUsers = await prisma.user.findMany();

    // Create stories
    const adventures = Array.from({ length: 20 }).map(() => ({
      title: faker.book.title(),
      description: faker.lorem.paragraph(),
      isAiGenerated: false,
      createdBy:
        createdUsers[Math.floor(Math.random() * createdUsers.length)].id,
    }));
    await prisma.story.createMany({ data: adventures });
    const createdStories = await prisma.story.findMany();

    // Create story nodes
    const storyParts = Array.from({ length: 100 }).map(() => ({
      storyId:
        createdStories[Math.floor(Math.random() * createdStories.length)].id,
      content: faker.lorem.paragraphs(),
    }));
    await prisma.storyNode.createMany({ data: storyParts });
    const createdStoryNodes = await prisma.storyNode.findMany();

    // Create story actions
    const storyActions = Array.from({ length: 200 }).map(() => ({
      nextNodeId:
        createdStoryNodes[Math.floor(Math.random() * createdStoryNodes.length)]
          .id,
      belongsToNodeId:
        createdStoryNodes[Math.floor(Math.random() * createdStoryNodes.length)]
          .id,
      action: faker.lorem.sentence(),
    }));
    await prisma.storyAction.createMany({ data: storyActions });
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
