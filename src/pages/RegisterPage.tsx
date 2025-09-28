import React from 'react';
import Layout from '@/components/layout/Layout';

const RegisterPage = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 text-center">
          <h1 className="font-inter font-bold text-3xl text-foreground mb-2">
            Create Account
          </h1>
          <p className="font-open-sans text-muted-foreground">
            Join VahanBazar and start your two-wheeler journey
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground font-open-sans">
            Registration form will be implemented in Phase 5
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;