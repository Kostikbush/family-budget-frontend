export const IndicateNewMessage = ({ isVie }: { isVie: boolean }) => {
  return <>{isVie && <div className="indicate"></div>}</>;
};
