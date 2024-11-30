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
      startNode: true,
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
          data-role={story?.isAiGenerated}
        >
          {story?.startNode?.content}
        </div>
        <div className="pt-4 w-full text-center font-extrabold text-2xl underline underline-offset-2">
          Action Menu
        </div>
        <div className="grid sm:grid-cols-2 gap-2 w-full pt-4">
          <Button
            variant="ghost"
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{"Option 1"}</span>
            <span className="text-muted-foreground">
              {"Strike with your sword."}
            </span>
          </Button>
          <Button
            variant="ghost"
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{"Option 2"}</span>
            <span className="text-muted-foreground">
              {"Turn and run as fast as you can."}
            </span>
          </Button>
          <Button
            variant="ghost"
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{"Option 3"}</span>
            <span className="text-muted-foreground">{"Beg for mercy."}</span>
          </Button>
          <Button
            variant="ghost"
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{"Option 4"}</span>
            <span className="text-muted-foreground">
              {"Close your eyes and pretend that you can't be seen."}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
