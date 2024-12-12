"use client";

import { useModal } from "@/providers/model-provider";
import React from "react";
import { Button } from "../ui/button";
import CustomModal from "../global/custom-model";
import UploadMediaForm from "../forms/upload-media";

type Props = {
  subaccountId: string;
};

const MediaUploadButton = ({ subaccountId }: Props) => {
  const { isOpen, setClose, setOpen } = useModal();
  return (
    <Button
      onClick={() => {
        setOpen(
          <CustomModal
            title="Upload Media"
            subheading="Upload a file to your Media Bucket"
          >
            <UploadMediaForm subaccountId={subaccountId}></UploadMediaForm>
          </CustomModal>
        );
      }}
    >
      Upload
    </Button>
  );
};

export default MediaUploadButton;
