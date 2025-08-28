import { memo } from "react";
import { FiletreeRoot, OpenFileWindow } from "./client";
import { filesystem } from "~/filesystem/data";

const HomePage = memo(() => {
  return (
    <main className="p-2">
      <FiletreeRoot filesystem={filesystem} />
      <OpenFileWindow filesystem={filesystem} />
    </main>
  );
});
HomePage.displayName = "HomePage";

export default HomePage;
