"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton />;
  if (error) return null;
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={(userId) => {
          // Check if the value is "unassigned" and convert it to null for the backend
          const valueToSend = userId === "unassigned" ? null : userId;
          axios
            .patch("/api/issues/" + issue.id, {
              assignedToUserId: valueToSend,
            })
            .then((response) => console.log("Success:", response))
            //.catch((error) => console.error("Patch request failed:", error));
            .catch(() => {
              toast.error('Changes could not be saved.');
            });
        }}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
