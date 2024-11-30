import { prisma } from "../prisma";
import { faker } from "@faker-js/faker";

async function main() {
  try {
    // Clear existing data to start fresh
    await prisma.action.deleteMany();
    await prisma.node.deleteMany();
    await prisma.story.deleteMany();
    await prisma.user.deleteMany();

    // Create Users
    const users = await Promise.all(
      Array.from({ length: 5 }).map(async () => {
        return prisma.user.create({
          data: {
            email: faker.internet.email(),
            name: faker.person.fullName(),
          },
        });
      })
    );

    // Create Stories for each user
    for (const user of users) {
      await Promise.all(
        Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(
          async () => {
            // Create story
            const story = await prisma.story.create({
              data: {
                title: faker.book.title(),
                description: faker.lorem.paragraph(),
                isAiGenerated: false,
                userId: user.id,
              },
            });

            // Create Nodes for this story
            const nodes = await Promise.all(
              Array.from({ length: faker.number.int({ min: 3, max: 7 }) }).map(
                async () => {
                  return prisma.node.create({
                    data: {
                      content: faker.lorem.paragraphs(),
                      storyId: story.id,
                    },
                  });
                }
              )
            );

            // Create Actions for each node
            for (const node of nodes) {
              await Promise.all(
                Array.from({
                  length: faker.number.int({ min: 1, max: 3 }),
                }).map(async () => {
                  const nextNode =
                    nodes[faker.number.int({ min: 0, max: nodes.length - 1 })];
                  return prisma.action.create({
                    data: {
                      action: faker.lorem.sentence(),
                      nodeId: node.id,
                      nextNodeId: nextNode ? nextNode.id : null,
                    },
                  });
                })
              );
            }

            // Set a random start node
            if (nodes.length > 0) {
              const startNode =
                nodes[faker.number.int({ min: 0, max: nodes.length - 1 })];
              await prisma.story.update({
                where: { id: story.id },
                data: { startNodeId: startNode.id },
              });
            }

            return story;
          }
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
