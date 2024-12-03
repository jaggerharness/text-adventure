import { Button } from "@/components/ui/button";
import { createGameSession } from "@/lib/actions";

export function PlayButton({ storyId }: { storyId: string }) {
  const startSession = createGameSession.bind(null, storyId);
  return (
    <form action={startSession}>
      <Button type="submit" className="ml-auto">
        Play
      </Button>
    </form>
  );
}
