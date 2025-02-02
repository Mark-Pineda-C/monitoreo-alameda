import { MotionScreen } from "../../components/motion-screen";

export function Profile() {
  return (
    <MotionScreen keyLabel="profile">
      <p>Profile!</p>
      <div className="h-full bg-red-500 w-full overflow-y-scroll"></div>
    </MotionScreen>
  );
}
