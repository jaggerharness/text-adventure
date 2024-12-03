import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { updateGameStep } from "@/lib/actions";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { GameSessionStatus } from "@prisma/client";
import { ReviewForm } from "./components/review-form";

export default async function Page(props: {
  params: Promise<{ sessionId: string }>;
}) {
  const params = await props.params;
  const sessionId = params.sessionId;
  const endIndex = -1;

  if (!sessionId) {
    redirect("/adventures");
  }

  const gameSession = await prisma.gameSession.findFirst({
    where: {
      id: sessionId,
    },
    include: {
      story: {
        include: {
          startNode: {
            include: {
              actions: true,
            },
          },
        },
      },
      steps: {
        include: {
          node: {
            include: {
              actions: true,
            },
          },
          action: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <div className="flex flex-col min-w-0 gap-6 flex-1 pt-4 px-2 pb-16">
        {gameSession?.steps.map((step) => (
          <div className="flex flex-col gap-2" key={step.id}>
            <div
              className={
                "flex w-max max-w-[75%] flex-col gap-2 rounded-lg p-3 bg-muted"
              }
            >
              {step.node.content}
            </div>
            {step.action && (
              <div
                className={
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg p-3 ml-auto bg-primary text-primary-foreground"
                }
              >
                {step.action.action}
              </div>
            )}
          </div>
        ))}
        {gameSession?.status === GameSessionStatus.STARTED && (
          <Card>
            <CardHeader className="text-xl">Actions</CardHeader>
            <CardContent className="grid auto-rows-fr sm:grid-cols-2 gap-2 w-full">
              {gameSession?.steps
                .at(endIndex)
                ?.node.actions.map((action, index) => {
                  return (
                    <form
                      key={action.id}
                      action={updateGameStep.bind(null, {
                        stepId: gameSession?.steps.at(endIndex)?.id ?? "",
                        actionId: action.id,
                        sessionId: sessionId,
                        nextNodeId: action.nextNodeId ?? "",
                      })}
                    >
                      <Button
                        variant="outline"
                        className="text-left p-4 text-sm flex-1 gap-1 sm:flex-col w-full h-full text-wrap justify-start items-start"
                      >
                        <span className="font-medium">{`Option ${
                          index + 1
                        }`}</span>
                        <span className="text-muted-foreground">
                          {action.action}
                        </span>
                      </Button>
                    </form>
                  );
                })}
            </CardContent>
          </Card>
        )}
        <Card>
          {gameSession?.status === GameSessionStatus.COMPLETED && (
            <div className="p-4">
              <p className="font-bold">Thanks for playing!</p>
              <p className="text-muted-foreground">
                If you liked the story, please consider leaving a review below.
              </p>
              <ReviewForm />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
