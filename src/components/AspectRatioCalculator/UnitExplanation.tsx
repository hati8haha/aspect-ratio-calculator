export const UnitExplanation = () => {
  return (
    <div className="mt-2">
      <p className="font-semibold text-primary flex items-center mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <title>Information Icon</title>
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        About CSS Units
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 text-sm">
        <div className="flex items-start p-2 rounded-lg hover:bg-base-200 transition-all duration-200">
          <span className="badge badge-secondary mr-2 px-2 py-3">px</span>
          <span className="text-base-content/80">Pixels, absolute units for screens</span>
        </div>
        <div className="flex items-start p-2 rounded-lg hover:bg-base-200 transition-all duration-200">
          <span className="badge badge-secondary mr-2 px-2 py-3">rem</span>
          <span className="text-base-content/80">Relative to root font size (html element)</span>
        </div>
        <div className="flex items-start p-2 rounded-lg hover:bg-base-200 transition-all duration-200">
          <span className="badge badge-secondary mr-2 px-2 py-3">em</span>
          <span className="text-base-content/80">Relative to parent font size</span>
        </div>
        <div className="flex items-start p-2 rounded-lg hover:bg-base-200 transition-all duration-200">
          <span className="badge badge-secondary mr-2 px-2 py-3">%</span>
          <span className="text-base-content/80">Percentage relative to parent element</span>
        </div>
        <div className="flex items-start p-2 rounded-lg hover:bg-base-200 transition-all duration-200">
          <span className="badge badge-secondary mr-2 px-2 py-3">vw/vh</span>
          <span className="text-base-content/80">Relative to viewport width/height (100vw = 100% of viewport width)</span>
        </div>
        <div className="flex items-start p-2 rounded-lg hover:bg-base-200 transition-all duration-200">
          <span className="badge badge-secondary mr-2 px-2 py-3">pt/in</span>
          <span className="text-base-content/80">Physical measurements (rarely used in web design)</span>
        </div>
      </div>
    </div>
  );
};

export default UnitExplanation;
