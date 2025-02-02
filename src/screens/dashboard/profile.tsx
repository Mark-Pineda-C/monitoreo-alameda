import { useQuery } from "convex/react";
import { MotionScreen } from "../../components/motion-screen";
import { api } from "../../../convex/_generated/api";

export function Profile() {
  const test = useQuery(api.parking_lots.test);
  return (
    <MotionScreen keyLabel="profile">
      <p>Profile!</p>
      <div className="h-full bg-red-500 w-full overflow-y-scroll">
        <p>id, numero</p>
        {test &&
          test.map((lot) => (
            <div key={lot._id} className="flex gap-2">
              <span>
                {lot._id}, {lot.number}
              </span>
            </div>
          ))}
      </div>
    </MotionScreen>
  );
}
