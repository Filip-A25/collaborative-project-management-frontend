"use client";

import { format } from "date-fns";

interface Props {
  invite: ProjectInvite;
  handleAcceptInvite: (projectId: string, inviteId: number) => void;
}

export const MobileProjectInviteCard = ({
  invite,
  handleAcceptInvite,
}: Props) => {
  const inviterFullName = `${invite.inviterUser.firstName} ${invite.inviterUser.lastName} (${invite.inviterUser.username})`;
  const expiresTime = format(invite.expiresAt, "PPpp");

  return (
    <article className="pb-4 rounded-lg overflow-hidden bg-white border border-muted-1/30">
      <header className="w-full mb-6 px-4 py-2 bg-muted-1/10">
        <h3 className="text-primary-dark-1 text-lg">
          <span className="text-muted-1">Invite to: </span>
          {invite.projectName}
        </h3>
      </header>
      <div className="px-4">
        <div className="grid grid-cols-5">
          <p className="text-xs text-muted-1 col-span-2 mb-3">Inviter</p>
          <p className="text-xs text-primary-dark-2 col-span-3">
            {inviterFullName}
          </p>
        </div>
        <div className="grid grid-cols-5">
          <p className="text-xs text-muted-1 col-span-2">Expires</p>
          <p className="text-xs text-primary-dark-2 col-span-3">
            {expiresTime}
          </p>
        </div>

        <button
          onClick={() => handleAcceptInvite(invite.projectId, invite.id)}
          className="mt-6 w-full text-sm py-2 bg-primary-1 rounded-lg text-white cursor-pointer"
        >
          Accept
        </button>
      </div>
    </article>
  );
};
