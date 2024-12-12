import BlurPage from "@/components/global/blur-page";
import React from "react";

type Props = {
  children: string;
};

const PipelineLayout = ({ children }: Props) => {
  return <BlurPage>{children}</BlurPage>;
};

export default PipelineLayout;
