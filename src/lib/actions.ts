"use server";

import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

interface CreateGameSession {
  id: string | null;
}

export async function createGameSession(storyId: string) {
  const session: CreateGameSession = {
    id: null,
  };

  try {
    const existingSession = await prisma.gameSession.findFirst({
      where: {
        userId: "cm456frxn0000i0knrq19dtmp",
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

    const gameSession = await prisma.gameSession.create({
      data: {
        userId: "cm456frxn0000i0knrq19dtmp",
        storyId: storyId,
      },
    });
    session.id = gameSession.id;
  } catch {
    return {
      message: "Database Error: Failed to Create Game Session.",
    };
  }

  redirect(`/play/${session.id}`);
}
