import { EditorBtns } from "@/lib/constants";
import { Youtube } from "lucide-react";
import React from "react";

type Props = {};

const VideoPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragStart(e, "video");
      }}
      className="h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
    >
      <Youtube size={40} className="text-muted-foreground" />
    </div>
  );
};

export default VideoPlaceholder;
