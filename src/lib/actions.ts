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

    if (existingSession) {
      return {
        message: "Existing Session Error: User already has started session.",
      };
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
