import { memo } from "react";
import { TreeRoot } from "~/components/tree";
import { tree } from "~/data";

const HomePage = memo(() => {
  return (
    <main className="p-4">
      <TreeRoot items={tree} />
    </main>
  );
});
HomePage.displayName = "HomePage";

export default HomePage;
