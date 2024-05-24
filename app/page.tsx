import Image from 'next/image'
import { Button } from '@radix-ui/themes';
import Pagination from './components/Pagination';

export default function Home() {
  return (
    <Pagination itemCount={100} pageSize={10} currentPage={1} />
  )
}
