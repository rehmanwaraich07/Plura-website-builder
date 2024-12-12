"use client";
import {
  getSubAccountTeamMembers,
  saveActivityLogsNotification,
  searchContacts,
  upsertTicket,
} from "@/lib/queries";
import { TicketFormSchema, TicketWithTags } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact, Tag, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User2 } from "lucide-react";
import { Button } from "../ui/button";
import Loading from "../global/loading";
import TagCreator from "../global/tag-creator";
import { useModal } from "@/providers/model-provider";
import { toast } from "@/hooks/use-toast";

type Props = {
  laneId: string;
  subaccountId: string;
  getNewTicket: (ticket: TicketWithTags[0]) => void;
};

const TicketForm = ({ getNewTicket, laneId, subaccountId }: Props) => {
  const { data: defaultData, setClose } = useModal();
  const router = useRouter();
  const [tags, setTags] = useState<Tag[]>([]);
  const [contact, setContact] = useState("");
  const [search, setSearch] = useState("");
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const [allTeamMembers, setAllTeamMembers] = useState<User[]>([]);
  const [assignedTo, setAssignedTo] = useState(
    defaultData.ticket?.Assigned?.id || ""
  );
  const form = useForm<z.infer<typeof TicketFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(TicketFormSchema),
    defaultValues: {
      name: defaultData.ticket?.name || "",
      description: defaultData.ticket?.description || "",
      value: String(defaultData.ticket?.value || 0),
    },
  });
  const isLoading = form.formState.isLoading;

  useEffect(() => {
    if (subaccountId) {
      const fetchData = async () => {
        const response = await getSubAccountTeamMembers(subaccountId);
        if (response) setAllTeamMembers(response);
      };
      fetchData();
    }
  }, [subaccountId]);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await searchContacts("");
      setContactList(response);
      setFilteredContacts(response);
    };
    fetchContacts();

    if (defaultData.ticket) {
      form.reset({
        name: defaultData.ticket.name || "",
        description: defaultData.ticket?.description || "",
        value: String(defaultData.ticket?.value || 0),
      });
      if (defaultData.ticket.customerId)
        setContact(defaultData.ticket.customerId);
    }
  }, [defaultData, form]);

  const onSubmit = async (values: z.infer<typeof TicketFormSchema>) => {
    if (!laneId) return;
    try {
      const response = await upsertTicket(
        {
          ...values,
          laneId,
          id: defaultData.ticket?.id,
          assignedUserId: assignedTo,
          ...(contact ? { customerId: contact } : {}),
        },
        tags
      );

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated a ticket | ${response?.name}`,
        subaccountId,
      });

      toast({
        title: "Success",
        description: "Saved Ticket Information Successfully!",
      });
      if (response) getNewTicket(response);

      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Could not save pipeline details",
      });
    }
    setClose();
  };

  const handleSelectContact = (contactId: string) => {
    setContact(contactId);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {defaultData.ticket ? "Edit Ticket" : "Create Ticket"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the ticket name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter the Badget..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>Add tags</FormLabel>
            <TagCreator
              subAccountId={subaccountId}
              getSelectedTags={setTags}
              defaultTags={defaultData.ticket?.Tags || []}
            />
            <FormLabel>Assigned To Team Member</FormLabel>
            <Select onValueChange={setAssignedTo} defaultValue={assignedTo}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage alt="contact" />
                        <AvatarFallback className="bg-primary text-sm text-white">
                          <User2 size={14} />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        Not Assigned
                      </span>
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {allTeamMembers.map((teamMember) => (
                  <SelectItem key={teamMember.id} value={teamMember.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage alt="contact" src={teamMember.avatarUrl} />
                        <AvatarFallback className="bg-primary text-sm text-white">
                          <User2 size={14} />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {teamMember.name}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormLabel>Customer</FormLabel>
            <div className="flex flex-col gap-2">
              <Select onValueChange={handleSelectContact} value={contact}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Customer..." />
                </SelectTrigger>
                <SelectContent>
                  {filteredContacts.map((c) => (
                    <SelectItem
                      key={c.id}
                      value={c.id}
                      className="flex items-center"
                    >
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-20 mt-4" disabled={isLoading} type="submit">
              {form.formState.isSubmitting ? <Loading /> : "Save"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TicketForm;
