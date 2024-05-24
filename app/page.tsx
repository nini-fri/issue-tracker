import Image from 'next/image'
import { Button } from '@radix-ui/themes';
import Pagination from './components/Pagination';
import LatestIssues from "./LatestIssues";

export default function Home({
}) {
  return (
    <LatestIssues />
  )
}
