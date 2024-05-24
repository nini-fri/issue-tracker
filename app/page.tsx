import Image from 'next/image'
import { Button } from '@radix-ui/themes';
import Pagination from './components/Pagination';
import prisma from '@/prisma/client';
import IssueSummary from './IssueSummary';
import LatestIssues from "./LatestIssues";
import IssueChart from './IssueChart';


export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: 'OPEN' },
  });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED' },
  });

  return (
  <>
  <IssueSummary open={open} inProgress={inProgress} closed={closed} />
  <LatestIssues />
  <IssueChart open={open} inProgress={inProgress} closed={closed} />;
  </>
)
}
