import { Button } from "@/components/ui/button";
import cx from "classnames";

const mockData = [
  {
    id: 0,
    role: 0 % 2 === 0 ? "user" : "ai",
    message: `Message number 0`,
  },
];

for (let i = 1; i <= 40; i++) {
  mockData.push({
    id: i,
    role: i % 2 === 0 ? "user" : "ai",
    message: `Message number ${i}`,
  });
}

export default function StoryPage() {
  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <div className="flex flex-col min-w-0 gap-6 flex-1 pt-4 px-2 pb-16">
        {[...mockData].map((data) => (
          <div
            key={data.id}
            className={cx(
              "flex gap-4 w-full rounded-xl",
              {
                "bg-primary text-primary-foreground px-3 w-fit ml-auto max-w-2xl py-2":
                  data.role === "user",
              },
              {
                "bg-primary/20 px-3 w-fit mr-auto max-w-2xl py-2":
                  data.role === "ai",
              }
            )}
            data-role={data.role}
          >
            {data.message}
          </div>
        ))}
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
