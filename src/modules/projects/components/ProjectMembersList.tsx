import { ProjectMember } from "../types/projectMember";

interface Props {
  members: ProjectMember[];
}

export const ProjectMembersList = ({ members }: Props) => {
  return (
    <div>
      <h2 className="text-primary-dark-1 text-base md:text-sm">
        Members <span className="text-muted-1">({members.length})</span>
      </h2>
      <ul className="rounded-lg flex flex-col gap-6 mt-2 px-4 py-4 md:w-60 md:min-h-40 border border-muted-1/30 bg-white">
        {members.map((member) => {
          const fullMemberName = `${member.firstName} ${member.lastName}`;

          return (
            <li key={member.username}>
              <button className="flex justify-between items-center w-full cursor-pointer">
                <div>
                  <p className="text-sm text-primary-dark-2 font-semibold text-start">
                    {fullMemberName}
                  </p>
                  <p className="text-xs text-muted-1 text-start">
                    {member.projectRole?.name}
                  </p>
                </div>
                {member.projectRole?.isCreatorRole && (
                  <p className="text-primary-2 text-xs bg-primary-1/10 rounded-md px-2 h-fit font-semibold">
                    Owner
                  </p>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
