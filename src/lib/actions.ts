"use server";

import { prisma } from "@/prisma";
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

    const existingSession = await prisma.gameSession.findFirst({
      where: {
        userId,
        storyId,
      },
    });

    // Later we'll allow to resume session from here.
    if (existingSession) {
      await prisma.gameSession.delete({
        where: {
          id: existingSession.id,
        },
      });
    }

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
