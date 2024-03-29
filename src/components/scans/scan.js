import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams, Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

import Titler from 'shared/titler';
import Loader from 'shared/loading';

import { requester, API_SCANS } from 'utilities/apiUtils';

import DeleteScan from 'components/scans/deleteScan';
import Hosts from 'components/hosts/hosts';
import NotFound from 'components/notFound';

const Scan = () => {
  const { id } = useParams();
  const [loading, updateLoading] = useState(true);
  const [scan, updateScan] = useState();
  const [loaded, updateLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const url = `${API_SCANS}/${id}`;
      const result = await requester({ url, method: 'GET' });
      updateLoading({ status: false });
      updateLoaded(true);
      if (result instanceof Error) {
        return;
      }
      updateScan(result);
    };
    const timer = setTimeout(() => fetchData(), 400);
    return () => {
      clearTimeout(timer);
    };
  }, [id]);
  return (
    <>
      {!loaded ||
        (scan && (
          <Header as="h2" content="Scan Results" className="light-header" />
        ))}

      <Loader
        loading={loading.status}
        loadingProps={{ size: 'huge', content: 'Populating Results...' }}
      >
        {loaded && !scan && <NotFound />}
        {scan && (
          <>
            <div className="header-section" data-testid="single-scan">
              <Header
                content={moment(scan.start_time * 1000).format('MMM D, YYYY')}
                as="h3"
              />
              <Titler
                title="Hosts Scanned"
                value={(scan.hosts_up + scan.hosts_down).toString()}
                bold
                linebreak
              />
              <Titler
                title="Hosts Up"
                value={scan.hosts_up.toString()}
                bold
                linebreak
              />
              <Titler
                title="Hosts Down"
                value={scan.hosts_down.toString()}
                bold
                linebreak
              />
            </div>
            <br />
            <Link to="/scans" className="basic-link">
              Back to all scans
            </Link>
            <Hosts hosts={scan.hosts} />
            <DeleteScan scan={scan} />
            <br />
            <br />
            <Link to="/scans" className="basic-link">
              Back to all scans
            </Link>
          </>
        )}
      </Loader>
    </>
  );
};

export default Scan;
