import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ sessionId: string }>;
}) {
  const params = await props.params;
  const sessionId = params.sessionId;

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
      actions: true,
    },
  });

  const story = gameSession?.story;

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <div className="flex flex-col min-w-0 gap-6 flex-1 pt-4 px-2 pb-16">
        <div
          key={story?.id}
          className={
            "flex gap-4rounded-xl bg-primary/20 px-3 w-fit mr-auto max-w-2xl py-2"
          }
        >
          {story?.startNode?.content}
        </div>
        <div className="pt-4 w-full text-left text-xl">Actions</div>
        <div className="grid sm:grid-cols-2 gap-2 w-full">
          {story?.startNode?.actions.map((action, index) => {
            return (
              <Button
                key={action.id}
                variant="outline"
                className="text-left px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto text-wrap justify-start items-start"
              >
                <span className="font-medium">{`Option ${index + 1}`}</span>
                <span className="text-muted-foreground">{action.action}</span>
                <span>{`DEBUG: Leads to: ${action.nextNodeId}`}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
