import { memo } from "react";
import { FileExplorer } from "~/components/file-explorer";
import { getFileOrDirectory } from "~/data/filesystem";
import { joinPath, pathHeirarchy } from "~/utils";

const FileExplorerPage = memo<{ params: Promise<{ path?: string[] }> }>(
  async ({ params }) => {
    const { path } = await params;

    let expandedDirectories: string[] = [];
    let openFilePath: string | null = null;

    if (path) {
      const joinedPath = joinPath(...path.map(decodeURIComponent));

      const openFile = getFileOrDirectory(joinedPath);
      if (openFile && openFile.type === "file") {
        openFilePath = openFile.path;
      }

      expandedDirectories = pathHeirarchy(joinedPath);
    }

    return (
      <main className="w-screen h-[100svh]">
        <FileExplorer
          baseUrlPath="/"
          updateHistory
          initialExpandedDirectories={expandedDirectories}
          initialOpenFilePath={openFilePath}
        />
      </main>
    );
  }
);
FileExplorerPage.displayName = "FileExplorerPage";

export default FileExplorerPage;
