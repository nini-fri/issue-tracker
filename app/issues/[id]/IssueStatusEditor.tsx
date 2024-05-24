"use client";

import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const statusMap: Record<
  Status,
  { label: string, color: 'red' | 'violet' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' }
};

const IssueStatusSelector = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const changeStatus = (status: Status) => {
    axios
      .patch(`/api/issues/${issue.id}`,{status})
      .then(() => router.refresh())
      .catch(error => {
        toast.error(`Changes could not be saved: ${error.response?.data?.message || error.message}`);
      });
  };
  return (
    <Select.Root value={issue.status} onValueChange={changeStatus}>
      <Select.Trigger/>
      <Select.Content>
        {Object.values(Status).map((status) => (
          <Select.Item key={status} value={status}>
            <IssueStatusBadge status={status} />
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusSelector;
