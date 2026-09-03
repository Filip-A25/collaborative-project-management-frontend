"use client";

import { format } from "date-fns";
import { useTaskComments } from "../hooks/useTaskComments";
import { DeleteForever } from "@mui/icons-material";

interface Props {
  projectId: string;
  taskId: string;
  comments: TaskComment[];
}

export const TaskCommentsList = ({ projectId, taskId, comments }: Props) => {
  const { deleteCurrentTaskComment } = useTaskComments();

  return (
    <div className="mt-10 pb-14 bg-white">
      <ul>
        {comments.map((comment) => {
          const commenterName = `${comment.commenterFirstName} ${comment.commenterLastName} `;
          const formattedDate = format(comment.createdAt, "Pp");

          return (
            <li
              key={comment.id}
              className="mt-2 py-2 px-4 bg-primary-2/5 rounded-lg"
            >
              <header className="flex">
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
                <button
                  onClick={() =>
                    deleteCurrentTaskComment(projectId, taskId, comment.id)
                  }
                  className="ml-auto group cursor-pointer"
                >
                  <DeleteForever
                    sx={{ fontSize: 16 }}
                    className="text-muted-1 group-hover:text-red-500"
                  />
                </button>
              </header>
              <p className="text-xs mt-1 text-primary-dark-1 text-[11px]">
                {comment.text}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
