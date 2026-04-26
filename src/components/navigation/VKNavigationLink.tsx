'use client';

import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';

type Props = ComponentProps<typeof Link> & {
  lang?: string;
  hrefLang?: string;
  href?: any;
};

const VKNavigationLink = ({ href, lang, hrefLang, children, ...rest }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`inline-block px-2 py-3 transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
      lang={lang}
      hrefLang={hrefLang}
      {...rest}
    >
      {children}
    </Link>
  );
};

export { VKNavigationLink };
