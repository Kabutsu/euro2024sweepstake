import { checkMembershipAndRedirect } from '../_actions';

export default async function Page({ params: { group: groupId } }: { params: { group: string } }) {
  await checkMembershipAndRedirect(groupId);
  
  return (
    <div>
      <h1>Draw</h1>
      <p>Here you will see the sweepstake draw</p>
    </div>
  );
};
