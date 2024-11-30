import { prisma } from "../prisma";
import { faker } from "@faker-js/faker";

async function main() {
  try {
    // Clear existing data to start fresh
    await prisma.action.deleteMany();
    await prisma.node.deleteMany();
    await prisma.story.deleteMany();
    await prisma.user.deleteMany();

    // Create User
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
    });

    // Create story
    const story = await prisma.story.create({
      data: {
        title: faker.book.title(),
        description: faker.lorem.paragraph(),
        isAiGenerated: false,
        userId: user.id,
      },
    });

    // Start of story
    const startNode = await prisma.node.create({
      data: {
        content: faker.lorem.paragraphs(),
        storyId: story.id,
      },
    });

    console.log({ startNode });

    await prisma.story.update({
      where: {
        id: story.id,
      },
      data: {
        startNodeId: startNode.id,
      },
    });

    const startingActions = await Promise.all(
      Array.from({
        length: 4,
      }).map(async () => {
        return prisma.action.create({
          data: {
            action: faker.lorem.sentence(),
            nodeId: startNode.id,
          },
        });
      })
    );

    const storyNodes = await Promise.all(
      Array.from({ length: 4 }).map(async (_, index) => {
        const createdNode = await prisma.node.create({
          data: {
            content: faker.lorem.paragraphs(),
            storyId: story.id,
          },
        });
        await prisma.action.update({
          where: {
            id: startingActions.at(index)?.id ?? "NA",
          },
          data: {
            nextNodeId: createdNode.id,
          },
        });
        return createdNode;
      })
    );

    // End of story
    const endNode = await prisma.node.create({
      data: {
        content: faker.lorem.paragraphs(),
        storyId: story.id,
      },
    });

    for (const storyNode of storyNodes) {
      await Promise.all(
        Array.from({
          length: 4,
        }).map(async () => {
          return prisma.action.create({
            data: {
              action: faker.lorem.sentence(),
              nodeId: storyNode.id,
              nextNodeId: endNode.id,
            },
          });
        })
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
