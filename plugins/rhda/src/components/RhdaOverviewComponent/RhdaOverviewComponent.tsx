import React from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { useRhdaAppData } from '../../useRhdaAppdata';
import { RHDAExecutorAPIRef } from '../../api';
import useAsync from 'react-use/lib/useAsync';
import { Progress, ResponseErrorPanel } from '@backstage/core-components';

export const RhdaOverviewComponent = () => {
  const apiClient = useApi(RHDAExecutorAPIRef);
  const { repositorySlug, manifestFilePath, error } = useRhdaAppData();

  const {
    value: reportData,
    loading,
    error: apiError,
  } = useAsync(async () => {
    try {
      const data = await apiClient.getHTMLReport(
        repositorySlug,
        manifestFilePath,
        'html',
      );
      // console.log(data);
      return data;
    } catch (error) {
      throw new Error(`Error fetching report: ${error}`);
    }
  });

  if (loading) {
    // Return the loading message properly
    return (
      <div>
        Getting the report... Please wait <Progress />
      </div>
    );
  }

  if (error || apiError) {
    return (
      <ResponseErrorPanel
        title={`RHDA Overview: ${error ? error.name : 'API Error'}`}
        error={error || apiError}
      />
    );
  }

  return (
    <div>
      {reportData && (
        <iframe
          title="HTML Report"
          srcDoc={reportData}
          style={{ width: '100%', height: '800px', border: 'none' }}
        />
      )}
    </div>
  );
};
