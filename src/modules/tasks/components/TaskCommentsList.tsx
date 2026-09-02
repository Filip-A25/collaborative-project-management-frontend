"use client";

import { format } from "date-fns";

interface Props {
  comments: TaskComment[];
}

export const TaskCommentsList = ({ comments }: Props) => {
  return (
    <div className="mt-10 pb-14 bg-white">
      <ul>
        {comments.map((comment) => {
          const commenterName = `${comment.commenterFirstName} ${comment.commenterLastName} `;
          const formattedDate = format(comment.createdAt, "Pp");

          return (
            <li key={comment.id} className="mt-4">
              <header>
                <h4 className="text-xs text-primary-dark-2 font-semibold">
                  {commenterName}{" "}
                  <span className="text-[10px] text-muted-1">
                    ({comment.commenterUsername})
                  </span>
                  {" • "}
                  <span className="text-[10px] text-muted-1">
                    {formattedDate}
                  </span>
                </h4>
                <p className="text-xs mt-1 text-primary-dark-1 text-[11px]">
                  {comment.text}
                </p>
              </header>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
