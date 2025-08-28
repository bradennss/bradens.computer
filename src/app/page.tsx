import { memo } from "react";
import { FiletreeRoot, OpenFileWindow } from "./client";
import { filesystem } from "~/filesystem/data";

const HomePage = memo(() => {
  return (
    <main className="p-4">
      <FiletreeRoot filesystem={filesystem} />
      <OpenFileWindow />
    </main>
  );
});
HomePage.displayName = "HomePage";

export default HomePage;
