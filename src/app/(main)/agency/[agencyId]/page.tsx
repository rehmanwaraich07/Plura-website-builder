import { notFound } from "next/navigation";

export default async function AgencyIdPage({
  params,
}: {
  params: { agencyId: string };
}) {
  const { agencyId } =  params;
  if (!agencyId) {
    notFound();
  }

  return (
    <div>
      <h1>Agency Dashboard</h1>
      <p>{agencyId}</p>
    </div>
  );
}
