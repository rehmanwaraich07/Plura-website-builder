"use client";
import { NotificationWithUser } from "@/lib/types";
import { UserButton } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "../ui/sheet";
import { Bell, X } from "lucide-react";
import { Role } from "@prisma/client";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { Button } from "../ui/button";
import { deleteNotification } from "@/lib/queries";
import { toast } from "sonner";

type Props = {
  notifications: NotificationWithUser | [];
  role?: Role;
  className?: string;
  subAccountId?: string;
};

const InfoBar = ({ notifications, subAccountId, className, role }: Props) => {
  const [allNotifications, setAllNotifications] = useState<
    NotificationWithUser | []
  >(notifications);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    setAllNotifications(notifications);
  }, [notifications]);

  const handleClick = () => {
    if (!showAll) {
      setAllNotifications(notifications);
    } else {
      if (notifications?.length !== 0) {
        setAllNotifications(
          notifications?.filter((item) => item.subAccountId === subAccountId) ??
            []
        );
      }
    }
    setShowAll((prev) => !prev);
  };

  const handleDelete = async (id: string) => {
    const result = await deleteNotification(id);
    if (result.success) {
      setAllNotifications((prev) =>
        Array.isArray(prev)
          ? prev.filter((notification) => notification.id !== id)
          : []
      );
      toast("Success", {
        description: "The notification has been permanently removed.",
      });
    } else {
      toast("Failed", {
        description: "Failed to delete the notification. Please try again.",
      });
    }
  };

  return (
    <>
      <div
        className={twMerge(
          "fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex gap-4 items-center border-b-[1px]",
          className
        )}
      >
        <div className="flex items-center gap-2 ml-auto">
          <UserButton afterSwitchSessionUrl="/" />
          <Sheet>
            <SheetTrigger>
              <div className="rounded-full w-9 h-9 bg-primary flex items-center justify-center text-white">
                <Bell size={18} className="font-bold" />
              </div>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader className="text-left mb-6 border-b pb-4">
                <div className="flex justify-between items-center">
                  <SheetTitle className="text-2xl font-bold">
                    Notifications
                  </SheetTitle>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label="Close notification bar"
                    >
                      <X className="h-5 w-5 mr-6" />
                    </Button>
                  </SheetClose>
                </div>
              </SheetHeader>
              <SheetDescription>
                {(role === "AGENCY_ADMIN" || role === "AGENCY_OWNER") && (
                  <Card className="flex items-center justify-between p-4 mb-6">
                    <span className="font-medium">Current Subaccount</span>
                    <Switch onCheckedChange={handleClick} />
                  </Card>
                )}
              </SheetDescription>
              <div className="space-y-6">
                {allNotifications && allNotifications.length > 0 ? (
                  allNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 relative"
                    >
                      <Avatar>
                        <AvatarImage
                          src={notification.User.avatarUrl}
                          alt="Profile Picture"
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {notification.User.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          <span className="font-bold">
                            {notification.notification.split("|")[0]}
                          </span>
                          <span className="text-muted-foreground">
                            {notification.notification.split("|")[1]}
                          </span>
                          <span className="font-bold">
                            {notification.notification.split("|")[2]}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(
                            notification.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                        onClick={() => handleDelete(notification.id)}
                        aria-label="Delete notification"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    You have no notifications
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <ModeToggle />
        </div>
      </div>
    </>
  );
};

export default InfoBar;
