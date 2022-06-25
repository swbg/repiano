export const VerticalIndicator: React.FC<{ positionY: number }> = ({
  positionY,
}) => {
  return (
    <div
      className="verticalIndicator"
      style={{
        top: positionY,
      }}
    ></div>
  );
};
