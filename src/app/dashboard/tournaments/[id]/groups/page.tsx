import React, { Suspense } from 'react';
import Tournament from '../../../../../features/tournaments/components/ui/Tournament/Tournament';

import ListAllGroups from '../../../../../features/groups/components/ui/ListAllGroups/ListAllGroups';
import { Types } from 'mongoose';

import LoadingSpinner from '../../../../../components/ui/loading-spinner/LoadingSpinner';

async function page({ params }: { params: { id: Types.ObjectId } }) {
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
