export const UnitExplanation = () => {
  return (
    <div className="mt-2">
      <h3 className="font-semibold text-primary mb-3">About CSS Units</h3>
      <div className="text-sm space-y-2">
        <div className="flex items-center">
          <span className="font-bold w-14">px</span>
          <span>Pixels, absolute units for screens</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold w-14">rem</span>
          <span>Relative to root font size</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold w-14">em</span>
          <span>Relative to parent font size</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold w-14">%</span>
          <span>Percentage of parent element</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold w-14">vw/vh</span>
          <span>Relative to viewport width/height</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold w-14">pt/in</span>
          <span>Physical measurements (rarely used)</span>
        </div>
      </div>
    </div>
  );
};

export default UnitExplanation;
