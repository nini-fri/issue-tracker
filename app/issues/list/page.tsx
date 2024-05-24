import { IssueStatusBadge, Link } from "@/app/components";
import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from './IssueTable';

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  //await delay(2000);
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });
  return (
    <div>
      <IssueActions />

      <IssueTable searchParams={searchParams} issues={issues} />
      <div className="custom-pagination">
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        />
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
