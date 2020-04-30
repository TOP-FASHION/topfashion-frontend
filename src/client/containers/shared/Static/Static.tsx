import React from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
import { AppContext } from '../../../core/Store/context';
import PageHeader from '../PageHeader';
import StaticContent from '../StaticContent';
import Loading from '../../../components/Loading';
import Fragment from '../../../components/Fragment';

interface Props {
  page?: any;
}

const Static = observer(({ page }: Props) => {
  const { pageStore } = React.useContext(AppContext);

  React.useEffect(() => {
    const idPage = normalizePage(page);
    pageStore.getPage(idPage);
  }, []);

  const normalizePage = (page = '') => {
    switch (page) {
      case 'about-us':
        return '2';
      case 'contact-us':
        return '4';
      case 'policy':
        return '3';
      default:
        return page;
    }
  };

  const breadcrumb = [
    { title: 'Home', url: '/' },
    { title: pageStore.pageContent.title.rendered, url: '' },
  ];

  return (
    <div className={`${page}-page-content`}>
      <Fragment>
        {!pageStore.pageContent ? (
          <Loading />
        ) : (
          <Fragment>
            <Helmet title={pageStore.pageContent.title.rendered} />
            <PageHeader
              header={pageStore.pageContent.title.rendered}
              breadcrumb={breadcrumb}
            />
            <StaticContent
              className="typography"
              content={pageStore.pageContent.content.rendered}
            />
          </Fragment>
        )}
      </Fragment>
    </div>
  );
});

export default Static;
