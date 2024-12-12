"use client";

import CreatePipelineForm from "@/components/forms/create-pipeline-form";
import CustomModal from "@/components/global/custom-model";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/providers/model-provider";
import { Pipeline } from "@prisma/client";
import { ChevronsUpDown, Plus, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  pipelineId: string;
  subAccountId: string;
  pipelines: Pipeline[];
};

const PipelineInfobar = ({
  pipelineId,
  pipelines = [],
  subAccountId,
}: Props) => {
  const { setOpen: setOpenModal } = useModal();
  const [value, setValue] = useState(pipelineId);
  const router = useRouter();

  const selectedPipeline = pipelines.find((pipeline) => pipeline.id === value);

  const handleClickCreatePipeline = () => {
    setOpenModal(
      <CustomModal
        title="Create a Pipeline"
        subheading="Pipeline allows you to group tickets into lanes and track your business processes all in one place"
      >
        <CreatePipelineForm subAccountId={subAccountId} />
      </CustomModal>
    );
  };

  const handlePipelineSelect = (pipelineId: string) => {
    setValue(pipelineId);
    router.push(`/subaccount/${subAccountId}/pipelines/${pipelineId}`);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-[200px] justify-between"
            >
              {selectedPipeline?.name || "Select a Pipeline..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            {pipelines.length === 0 ? (
              <DropdownMenuItem disabled>No pipelines found</DropdownMenuItem>
            ) : (
              <>
                {pipelines.map((pipeline) => (
                  <DropdownMenuItem
                    key={pipeline.id}
                    onClick={() => handlePipelineSelect(pipeline.id)}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        value === pipeline.id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {pipeline.name}
                  </DropdownMenuItem>
                ))}
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClickCreatePipeline}>
              <Plus className="mr-2 h-4 w-4" />
              Create Pipeline
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PipelineInfobar;
