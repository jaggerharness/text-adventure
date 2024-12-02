import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

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
        <Card>
          <CardHeader className="text-xl">Actions</CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-2 w-full">
            {gameSession?.steps
              .at(endIndex)
              ?.node.actions.map((action, index) => {
                return (
                  <Button
                    key={action.id}
                    variant="outline"
                    className="text-left px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto text-wrap justify-start items-start"
                  >
                    <span className="font-medium">{`Option ${index + 1}`}</span>
                    <span className="text-muted-foreground">
                      {action.action}
                    </span>
                    <span>{`DEBUG: ID: ${action.id} Leads to: ${action.nextNodeId}`}</span>
                  </Button>
                );
              })}
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Continue</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
