import { CMS_NAME } from '@/lib/constants';
import Link from 'next/link';

export function Intro() {
  return (
    <section className='flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12'>
      <h1 className='text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8'>
        G - Start Up
      </h1>
      <nav>
        <ul className='flex'>
          <li className='mr-6'>
            <Link as={`/`} href='/' className='hover:underline'>
              홈
            </Link>
          </li>
          <li className='mr-6'>
            <Link
              as={`/business-notice`}
              href='/business-notice'
              className='hover:underline'
            >
              사업공고
            </Link>
          </li>
          <li className='mr-6'>
            <Link
              as={`/card-news`}
              href='/card-news'
              className='hover:underline'
            >
              카드 뉴스
            </Link>
          </li>
          <li className='mr-6'>
            <Link
              as={`/space`}
              href='/space'
              className='hover:underline'
            >
              창업공간
            </Link>
          </li>
          <li className='mr-6'>
            <Link
              as={`/community`}
              href='/community'
              className='hover:underline'
            >
              경험 공유
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
