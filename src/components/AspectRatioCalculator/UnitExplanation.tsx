export const UnitExplanation = () => {
  return (
    <div className="mt-4 text-xs text-gray-500">
      <p className="font-semibold">About CSS Units:</p>
      <ul className="list-disc pl-5 mt-1">
        <li>
          <span className="font-medium">px</span> - Pixels, absolute units for
          screens
        </li>
        <li>
          <span className="font-medium">rem</span> - Relative to root font size
          (html element)
        </li>
        <li>
          <span className="font-medium">em</span> - Relative to parent font size
        </li>
        <li>
          <span className="font-medium">%</span> - Percentage relative to parent
          element
        </li>
        <li>
          <span className="font-medium">vw, vh</span> - Relative to viewport
          width/height (100vw = 100% of viewport width)
        </li>
        <li>
          <span className="font-medium">cm, mm, in, pt, pc</span> - Physical
          measurements (rarely used in web design)
        </li>
      </ul>
    </div>
  );
};

export default UnitExplanation;
