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

    // Create story nodes and actions
    for (const story of createdStories) {
      const storyNodes = Array.from({ length: 5 }).map(() => ({
        storyId: story.id,
        content: faker.lorem.paragraphs(),
      }));
      await prisma.storyNode.createMany({ data: storyNodes });
      const createdStoryNodes = await prisma.storyNode.findMany({
        where: { storyId: story.id },
      });

      await prisma.story.update({
        where: { id: story.id },
        data: { startStoryNodeId: createdStoryNodes[0].id },
      });

      const storyActions = createdStoryNodes.flatMap((node) =>
        Array.from({ length: 2 }).map(() => ({
          nextNodeId:
            createdStoryNodes[
              Math.floor(Math.random() * createdStoryNodes.length)
            ].id,
          belongsToNodeId: node.id,
          action: faker.lorem.sentence(),
        }))
      );
      await prisma.storyAction.createMany({ data: storyActions });
    }

    console.log("Database has been seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
