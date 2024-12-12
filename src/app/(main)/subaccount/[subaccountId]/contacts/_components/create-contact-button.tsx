"use client";

import ContactUserForm from "@/components/forms/contact-user-form";
import CustomModal from "@/components/global/custom-model";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/model-provider";
import { Plus } from "lucide-react";
import React from "react";

type Props = {
  subaccountId: string;
};

const CreateContactButton = ({ subaccountId }: Props) => {
  const { setOpen } = useModal();

  const handleCreateContact = async () => {
    setOpen(
      <CustomModal
        title="Create or Update Contact Information"
        subheading="Contacts are like Customers."
      >
        <ContactUserForm subaccountId={subaccountId} />
      </CustomModal>
    );
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Contacts</h1>
      <Button onClick={handleCreateContact}>
        <Plus size={15} className="shrink-0 mr-2" /> Create
      </Button>
    </div>
  );
};

export default CreateContactButton;
