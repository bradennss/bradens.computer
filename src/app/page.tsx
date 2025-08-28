import { memo } from "react";
import { FiletreeRoot } from "~/components/filetree";
import { filesystem } from "~/filesystem/data";

const HomePage = memo(() => {
  return (
    <main className="p-4">
      <FiletreeRoot filesystem={filesystem} />
    </main>
  );
});
HomePage.displayName = "HomePage";

export default HomePage;
