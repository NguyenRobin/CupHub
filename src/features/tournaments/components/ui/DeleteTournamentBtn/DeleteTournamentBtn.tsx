'use client';

import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import './DeleteTournamentBtn.scss';
import LoadingSpinner from '../../../../../components/ui/loading-spinner/LoadingSpinner';
import { useRouter } from 'next/navigation';

export async function deleteTournamentById(id: string) {
  // const token = cookies().get(process.env.TOKEN_NAME!);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tournaments/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Cookie: `${process.env.TOKEN_NAME}=${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      console.log('response.ok is', response.ok);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

function DeleteTournamentBtn({ name, id }: { name: string; id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const deleteTournament = async (id: string) => {
    setIsLoading(true);

    const response = await deleteTournamentById(id);

    if (response.status === 200) {
      setIsLoading(false);

      router.refresh();
      router.push('/dashboard');
    }
  };

  return (
    <div className="delete-tournament">
      <AiOutlineDelete
        className="delete-tournament-btn__icon"
        size={25}
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {isOpen && (
        <div className="delete-modal">
          <div className="delete-modal__confirmation">
            <h3 className="delete-modal__title">
              Are you <strong>sure</strong> you want to
              <strong style={{ color: 'black' }}> DELETE </strong>this
              <strong> tournament</strong>?
              <br />
              <br />
              <strong>&quot;{name}&quot;</strong>
            </h3>

            <div className="delete-modal__actions">
              <button
                className="delete-modal__button delete-modal__button--cancel"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`delete-modal__button delete-modal__button--delete ${
                  isLoading && 'loading'
                }`}
                onClick={() => deleteTournament(id)}
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size={15} /> : <p>Delete</p>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteTournamentBtn;
