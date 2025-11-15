import React from 'react';
import { Providers, ProviderState } from '@microsoft/mgt-element';
import { MgtPerson, MgtAgenda, MgtFileList, MgtLogin, MgtSearchBox } from '@microsoft/mgt-react';

interface MGTProviderProps {
  children: React.ReactNode;
}

export const MGTProvider: React.FC<MGTProviderProps> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  React.useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider;
      setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
    };

    Providers.onProviderUpdated(updateState);
    updateState();

    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    };
  }, []);

  return (
    <div className="mgt-provider">
      {children}
    </div>
  );
};

export const CompanyTeamSection: React.FC = () => {
  const teamMembers = [
    'kaung.htet.paung@esim.com.mm',
    'cto@esim.com.mm', 
    'coo@esim.com.mm',
    'head.engineering@esim.com.mm'
  ];

  return (
    <div className="company-team-section">
      <h2 className="text-2xl font-bold mb-6 text-white">Leadership Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((email, index) => (
          <div key={index} className="team-member-card glass-card p-4">
            <MgtPerson
              personQuery={email}
              view="twolines"
              showPresence={true}
              personCardInteraction="hover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const CompanyFilesSection: React.FC = () => {
  return (
    <div className="company-files-section">
      <h2 className="text-2xl font-bold mb-6 text-white">Company Resources</h2>
      <div className="glass-card p-6">
        <MgtFileList
          siteId="esimmyanmar.sharepoint.com"
          driveId="company-resources"
          itemPath="/Company Profile"
          pageSize={10}
          hideMoreFilesButton={false}
        />
      </div>
    </div>
  );
};

export const NewsAndEventsSection: React.FC = () => {
  return (
    <div className="news-events-section">
      <h2 className="text-2xl font-bold mb-6 text-white">Upcoming Events</h2>
      <div className="glass-card p-6">
        <MgtAgenda
          groupByDay={true}
          days={30}
          showMax={5}
          eventQuery="eSIM Myanmar"
        />
      </div>
    </div>
  );
};

export const GlobalSearchSection: React.FC = () => {
  return (
    <div className="global-search-section">
      <div className="glass-card p-4">
        <MgtSearchBox
          searchTerm=""
          placeholder="Search eSIM Myanmar resources..."
          entityTypes={['driveItem', 'listItem', 'site']}
          queryTemplate="eSIM Myanmar {searchTerms}"
        />
      </div>
    </div>
  );
};

export const AdminLoginSection: React.FC = () => {
  return (
    <div className="admin-login-section">
      <div className="glass-card p-4">
        <MgtLogin
          loginView="compact"
          logoutView="compact"
        />
      </div>
    </div>
  );
};

interface CompanyProfileLayoutProps {
  children: React.ReactNode;
  showTeam?: boolean;
  showFiles?: boolean;
  showEvents?: boolean;
  showSearch?: boolean;
}

export const CompanyProfileLayout: React.FC<CompanyProfileLayoutProps> = ({
  children,
  showTeam = false,
  showFiles = false,
  showEvents = false,
  showSearch = true
}) => {
  return (
    <MGTProvider>
      <div className="company-profile-layout">
        {showSearch && (
          <div className="mb-8">
            <GlobalSearchSection />
          </div>
        )}
        
        <div className="main-content mb-8">
          {children}
        </div>

        {showTeam && (
          <div className="mb-8">
            <CompanyTeamSection />
          </div>
        )}

        {showFiles && (
          <div className="mb-8">
            <CompanyFilesSection />
          </div>
        )}

        {showEvents && (
          <div className="mb-8">
            <NewsAndEventsSection />
          </div>
        )}
      </div>
    </MGTProvider>
  );
};