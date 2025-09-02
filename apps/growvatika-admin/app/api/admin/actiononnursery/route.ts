import client from "@repo/db/client";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { TApiResponse } from "@repo/common-types";
import { NextRequest, NextResponse } from "next/server";
import { sellerAccountSetupEmail } from "@/helper/send-seller-account-setup-mail";

export async function PATCH(
  req: NextRequest
): Promise<NextResponse<TApiResponse>> {
  try {
    const adminSession = await getServerSession(NEXT_AUTH);
    if (!adminSession) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized request",
        },
        { status: 401 }
      );
    } else {
      const { searchParams } = new URL(req.url);
      const nurseryId = searchParams?.get("nurseryId") || "";
      const tag = searchParams.get("tag");
      if (nurseryId === "" || tag === "") {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid Id",
          },
          { status: 400 }
        );
      }
      const existingNursery = await client.seller.findUnique({
        where: {
          id: nurseryId,
        },
      });
      // throw error if there is not existing nursery with the requested id
      if (!existingNursery) {
        return NextResponse.json(
          {
            success: false,
            error: `Nursery with ID ${nurseryId} not found`,
          },
          { status: 404 }
        );
      }

      if (tag === "launch") {
        // execute the following block only if the nursery is new.
        if (!existingNursery.isAdminVerified) {
          await client.seller.update({
            where: {
              id: existingNursery.id,
            },
            data: {
              isAdminVerified: true,
              adminName: adminSession.user.name,
            },
          });

          const emailResponse = await sellerAccountSetupEmail(
            existingNursery.nurseryName,
            existingNursery.email
          );

          // If error while sending email
          if (!emailResponse.success) {
            console.error(
              "Error while sending email to the new nursery:",
              emailResponse.message
            );
            return NextResponse.json({
              success: false,
              error: `New nursery is verified by the admin ${adminSession.user.name},but error while sending email`,
            });
          }
        }
        // execute the following bock if the nursery is not new
        else {
          await client.seller.update({
            where: {
              id: existingNursery.id,
            },
            data: {
              isSuspended: false,
              isRemoved: false,
              adminName: adminSession.user.name,
            },
          });
        }
      } else if (tag === "suspend") {
        await client.seller.update({
          where: {
            id: existingNursery.id,
          },
          data: {
            isSuspended: true,
            isRemoved: false,
            adminName: adminSession.user.name,
          },
        });
      } else if (tag === "remove") {
        await client.seller.update({
          where: {
            id: existingNursery.id,
          },
          data: {
            isSuspended: true,
            isRemoved: true,
            adminName: adminSession.user.name,
          },
        });
      } else {
        return NextResponse.json(
          { success: false, error: "Invalid tag" },
          { status: 400 }
        );
      }
      const newNurseries = await client.seller.count({
        where: {
          isAdminVerified: false,
          isSuspended: false,
          isRemoved: false,
        },
      });
      const approvedNurseries = await client.seller.count({
        where: {
          isAdminVerified: true,
          isSuspended: false,
          isRemoved: false,
        },
      });
      const suspendedNurseries = await client.seller.count({
        where: {
          isAdminVerified: true,
          isSuspended: true,
          isRemoved: false,
        },
      });
      const removedNurseries = await client.seller.count({
        where: {
          isAdminVerified: true,
          isSuspended: true,
          isRemoved: true,
        },
      });
      const countOfNurseries = {
        newNurseries,
        approvedNurseries,
        suspendedNurseries,
        removedNurseries,
      };
      return NextResponse.json(
        {
          success: true,
          message: `Nursery of id:${nurseryId} ${tag} by the growvatik admin ${adminSession.user.name}`,
          countOfNurseries,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}
