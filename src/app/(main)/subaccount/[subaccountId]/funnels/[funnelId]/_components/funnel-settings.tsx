import React from "react";
import { Funnel } from "@prisma/client";
import { db } from "@/lib/db";
import { getConnectAccountProducts } from "@/lib/stripe/stripe-actions";
import FunnelForm from "@/components/forms/funnel-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FunnelProductsTable from "./funnel-products-table";
import Stripe from "stripe";

interface FunnelSettingsProps {
  subaccountId: string;
  defaultData: Funnel;
}

const FunnelSettings: React.FC<FunnelSettingsProps> = async ({
  subaccountId,
  defaultData,
}) => {
  const subaccountDetails = await db.subAccount.findUnique({
    where: {
      id: subaccountId,
    },
  });

  if (!subaccountDetails) return null;

  let products: Stripe.Product[] = [];
  if (subaccountDetails.connectAccountId) {
    products = (await getConnectAccountProducts(
      subaccountDetails.connectAccountId
    )) as Stripe.Product[];
  }

  return (
    <div className="flex gap-4 flex-col xl:flex-row">
      <Card className="flex-1 flex-shrink-0">
        <CardHeader>
          <CardTitle>Funnel Products</CardTitle>
          <CardDescription>
            Select the products and services you wish to sell on this funnel.
            You can sell one-time and recurring products.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {subaccountDetails.connectAccountId ? (
            <FunnelProductsTable
              defaultData={defaultData}
              products={products}
            />
          ) : (
            <p>Connect your Stripe account to sell products.</p>
          )}
        </CardContent>
      </Card>

      <Card className="flex-1 flex-shrink-0">
        <CardHeader>
          <CardTitle>Funnel Settings</CardTitle>
          <CardDescription>
            Update your funnel details and configuration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FunnelForm subAccountId={subaccountId} defaultData={defaultData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default FunnelSettings;
