"use server";

import { prisma } from "@/prisma";
import { GameSessionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface CreateGameSessionId {
  id: string | null;
}

export async function createGameSession(storyId: string) {
  const session: CreateGameSessionId = {
    id: null,
  };

  try {
    // TODO: this should be the auth user
    const userId = "abc";

    const story = await prisma.story.findFirst({
      where: {
        id: storyId,
      },
    });

    if (!story || !story.startNodeId) {
      return {
        message: "Database Error: Story Not Found",
      };
    }

    const gameSession = await prisma.gameSession.create({
      data: {
        userId,
        storyId: storyId,
        status: GameSessionStatus.STARTED,
        steps: {
          create: [
            {
              nodeId: story.startNodeId,
            },
          ],
        },
      },
    });
    session.id = gameSession.id;
  } catch (error) {
    console.log({ error });
    return {
      message: "Database Error: Failed to Create Game Session.",
    };
  }

  redirect(`/play/${session.id}`);
}

export async function updateGameStep({
  stepId,
  actionId,
  sessionId,
  nextNodeId,
}: {
  stepId: string;
  actionId: string;
  sessionId: string;
  nextNodeId: string;
}) {
  await prisma.gameStep.update({
    where: {
      id: stepId,
    },
    data: {
      actionId: actionId,
    },
  });

  const updatedSession = await prisma.gameSession.update({
    where: {
      id: sessionId,
    },
    data: {
      steps: {
        create: [
          {
            nodeId: nextNodeId,
          },
        ],
      },
    },
    include: {
      steps: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        include: {
          node: {
            include: {
              actions: true,
            },
          },
        },
      },
    },
  });

  if (updatedSession.steps.at(0)?.node.actions.length === 0) {
    await prisma.gameSession.update({
      where: {
        id: sessionId,
      },
      data: {
        status: GameSessionStatus.COMPLETED,
      },
    });
  }

  revalidatePath(`/play/${sessionId}`);
}
