'use client';

import CancelButton from '~/app/_components/cancel-button';
import SubmitButton from '~/app/_components/submit-button';

type Props = {
  onSubmit: () => void;
  isLoading: boolean;
}

const DrawGroup = ({ onSubmit, isLoading }: Props) => {
  return (
    <form action={onSubmit} className="flex flex-col gap-6">
      <h1 className="text-center text-xl font-bold">Draw Teams</h1>
      <p className="text-center text-base text-wrap px-2">
        Are you sure you want to draw the teams for this group?
      </p>
      <div className="flex flex-row justify-between mt-2">
        <CancelButton text="No, Cancel" disabled={isLoading} />
        <SubmitButton text="Yes, Draw" disabled={isLoading} />
      </div>
    </form>
  );
};

export default DrawGroup;
