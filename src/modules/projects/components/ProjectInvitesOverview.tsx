"use client";

import { LayoutHeading } from "@/shared/ui/LayoutHeading";
import { sidebarItems } from "../const/sidebarItems";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import { acceptInvite } from "../queries/acceptInvite";
import { MobileProjectInviteCard } from "./MobileProjectInviteCard";

interface Props {
  invites: ProjectInvite[];
}

export const ProjectInvitesOverview = ({ invites }: Props) => {
  const [allInvites, setAllInvites] = useState<ProjectInvite[]>(invites);

  const sidebarItem = sidebarItems.find((item) => item.name === "Invites");

  const handleAcceptInvite = async (projectId: string, inviteId: number) => {
    const response = await acceptInvite(projectId, inviteId);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    setAllInvites((prev) => prev.filter((invite) => inviteId !== invite.id));
    toast.success(response.message);
  };

  return (
    <>
      {sidebarItem && (
        <LayoutHeading
          baseRouteName={sidebarItem.name}
          iconSvg={sidebarItem.icon}
        />
      )}
      <section className="flex flex-col gap-4 px-4 mt-24 pb-20 md:pl-0 md:mt-12">
        <table className="max-md:hidden w-full h-full bg-white px-2 table-fixed rounded-t-lg overflow-hidden">
          <colgroup>
            <col className="w-1/4" />
            <col className="w-1/4" />
            <col className="w-1/4" />
            <col className="w-1/4" />
          </colgroup>
          <thead>
            <tr className="text-left ml-10 border-b border-muted-1/30 bg-muted-1/15">
              <th className="py-2 pl-3 pr-2 font-medium text-muted-1 text-sm">
                Project
              </th>
              <th className="font-medium text-muted-1 text-sm pr-2">Inviter</th>
              <th className="font-medium text-muted-1 text-sm pr-2">Expires</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allInvites.map((invite) => {
              const inviterFullName = `${invite.inviterUser.firstName} ${invite.inviterUser.lastName} (${invite.inviterUser.username})`;
              const expiresTime = format(invite.expiresAt, "PPpp");

              return (
                <tr
                  key={invite.id}
                  className="text-sm text-left text-primary-dark-1/70"
                >
                  <td className="py-3 font-medium text-primary-2/80 pl-4 pr-2 md:whitespace-nowrap truncate">
                    {invite.projectName}
                  </td>
                  <td className="pr-2">{inviterFullName}</td>
                  <td className="pr-2">{expiresTime}</td>
                  <td className="pr-2">
                    <button
                      onClick={() =>
                        handleAcceptInvite(invite.projectId, invite.id)
                      }
                      className="hover:text-primary-1 font-bold transition-colors duration-150 ease-in-out cursor-pointer"
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p className="text-muted-1 text-sm mx-auto mt-6">No invites found.</p>

        <div className="md:hidden">
          {allInvites.map((invite) => (
            <MobileProjectInviteCard
              key={invite.id}
              invite={invite}
              handleAcceptInvite={handleAcceptInvite}
            />
          ))}
        </div>
      </section>
    </>
  );
};
