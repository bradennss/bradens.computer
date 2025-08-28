import { memo } from "react";
import { FileExplorer } from "~/components/file-explorer";

const HomePage = memo(() => {
  return (
    <main className="w-screen h-[100svh]">
      <FileExplorer />
    </main>
  );
});
HomePage.displayName = "HomePage";

export default HomePage;
