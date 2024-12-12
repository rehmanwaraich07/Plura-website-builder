import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getAuth } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { NextRequest } from "next/server";

const f = createUploadthing();

const authenticateUser = async ({ req }: { req: NextRequest }) => {
  const { userId } = await getAuth(req);
  if (!userId) throw new UploadThingError("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  subaccountLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Subaccount logo upload completed", metadata, file);
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  avatar: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Avatar upload completed", metadata, file);
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  agencyLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Agency logo upload completed", metadata, file);
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Media upload completed", metadata, file);
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
