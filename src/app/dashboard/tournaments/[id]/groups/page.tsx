import React, { Suspense } from 'react';
import Tournament from '../../../../../features/tournaments/components/ui/Tournament/Tournament';

import ListAllGroups from '../../../../../features/groups/components/ui/ListAllGroups/ListAllGroups';
import { Types } from 'mongoose';

import LoadingSpinner from '../../../../../components/ui/loading-spinner/LoadingSpinner';

async function page(props: { params: Promise<{ id: Types.ObjectId }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <Suspense fallback={<LoadingSpinner size={40} />}>
      <Tournament tournamentId={id}>
        <ListAllGroups tournamentId={id} />
      </Tournament>
    </Suspense>
  );
}

export default page;
