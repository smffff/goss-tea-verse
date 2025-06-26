
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ className }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: { [key: string]: string } = {
    about: 'About',
    tokenomics: 'Tokenomics',
    roadmap: 'Roadmap',
    team: 'Team',
    faq: 'FAQ',
    memeops: 'MemeOps',
    feed: 'Tea Feed',
    spill: 'Spill Tea',
    leaderboard: 'Spillerboard'
  };

  if (pathnames.length === 0) {
    return null; // Don't show breadcrumb on home page
  }

  return (
    <nav 
      className={cn("flex items-center space-x-2 text-sm text-tabloid-black/60", className)}
      aria-label="Breadcrumb navigation"
    >
      <Link 
        to="/" 
        className="flex items-center hover:text-vintage-red transition-colors focus:outline-none focus:text-vintage-red"
        aria-label="Home"
      >
        <Home className="w-4 h-4" aria-hidden="true" />
      </Link>
      
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbNameMap[pathname] || pathname;

        return (
          <React.Fragment key={pathname}>
            <ChevronRight className="w-4 h-4 text-tabloid-black/40" aria-hidden="true" />
            {isLast ? (
              <span 
                className="text-tabloid-black font-medium"
                aria-current="page"
              >
                {displayName}
              </span>
            ) : (
              <Link 
                to={routeTo}
                className="hover:text-vintage-red transition-colors focus:outline-none focus:text-vintage-red"
              >
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
