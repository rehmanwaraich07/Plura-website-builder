import AgencyDetails from "@/components/forms/agency-details";
import UserDetails from "@/components/forms/user-details";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: { agencyId: string };
};

const SettingsPage = async ({ params }: Props) => {
  const authUser = await currentUser();

  if (!authUser) {
    redirect("/sign-in");
  }

  const { agencyId } =  params;

  if (!agencyId) {
    notFound();
  }

  const [userDetails, agencyDetails] = await Promise.all([
    db.user.findUnique({
      where: {
        email: authUser.emailAddresses[0].emailAddress,
      },
    }),
    db.agency.findUnique({
      where: {
        id: agencyId,
      },
      include: {
        SubAccount: true,
      },
    }),
  ]);

  if (!userDetails) {
    redirect("/sign-in");
  }

  if (!agencyDetails) {
    notFound();
  }

  return (
    <div className="flex lg:!flex-row flex-col gap-4">
      <AgencyDetails data={agencyDetails} />
      <UserDetails
        type="agency"
        id={agencyId}
        subAccounts={agencyDetails.SubAccount}
        userData={userDetails}
      />
    </div>
  );
};

export default SettingsPage;
