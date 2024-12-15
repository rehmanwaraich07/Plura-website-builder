"use client";
import React from "react";
import BlurPage from "@/components/global/blur-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";
import clsx from "clsx";

type Props = {};

const Automations = (props: Props) => {
  return (
    <BlurPage>
      <div
        className={clsx("flex items-center justify-center h-full text-white")}
      >
        <Card className="w-[90%] max-w-md bg-gray-900 shadow-xl border-gray-800">
          <CardHeader className="flex flex-col items-center">
            <Construction className="w-16 h-16 text-[#004BE0] animate-bounce" />
            <CardTitle className="text-3xl mt-4 text-center">
              Automations Under Construction
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-400">
            <p className="mb-6">
              We're currently working on building something amazing. Stay tuned
              for updates!
            </p>
            <Button
              className="w-full bg-primary text-muted text-white hover:bg-[#004be0d2]"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    </BlurPage>
  );
};

export default Automations;
