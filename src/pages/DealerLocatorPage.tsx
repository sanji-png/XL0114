import React from 'react';
import Layout from '@/components/layout/Layout';

const DealerLocatorPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-inter font-bold text-3xl text-foreground mb-2">
            Find Dealers
          </h1>
          <p className="font-open-sans text-muted-foreground">
            Locate authorized showrooms and dealers near you
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground font-open-sans">
            Coming Soon!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default DealerLocatorPage;