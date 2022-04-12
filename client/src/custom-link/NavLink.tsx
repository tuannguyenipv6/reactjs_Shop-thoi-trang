import Link from 'next/link';
import { ReactNode } from 'react';

interface INavLinkProps {
  href: string;
  children: ReactNode;
}

function NavLink({ href, children }: INavLinkProps) {
  // Must add passHref to Link
  return (
    <Link href={href} passHref>
      {children}
    </Link>
  )
}

export default NavLink;