import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const storyId = params.id;

  if (!storyId) {
    redirect("/adventures");
  }

  const story = await prisma.story.findFirst({
    where: {
      id: storyId,
    },
    include: {
      startNode: {
        include: {
          actions: true,
        },
      },
    },
  });

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
        <div className="pt-4 w-full text-center font-extrabold text-2xl underline underline-offset-2">
          Action Menu
        </div>
        <div className="grid sm:grid-cols-2 gap-2 w-full pt-4">
          {story?.startNode?.actions.map((action, index) => {
            return (
              <Button
                key={action.id}
                variant="outline"
                className="flex flex-col text-wrap h-fit"
              >
                <span className="font-medium">{`Option ${index + 1}`}</span>
                <span className="text-muted-foreground">{action.action}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
