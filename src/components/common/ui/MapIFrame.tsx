import React from "react";

const MapIFrame = ({ iframe }: { iframe?: string }) => {
  return (
    <div className={"w-full"}>
      <label className={"label"}>Map :</label>
      <div className={"w-full flex justify-between"}>
        {iframe ? (
          <div
            className={"w-full"}
            dangerouslySetInnerHTML={{
              __html: iframe
                .replace('width="(d+)"', 'width="100%"')
                .replace("width='(d+)'", 'width="100%"')
                .replace("width:(d+)", "width:100%") as unknown as TrustedHTML,
            }}
          ></div>
        ) : (
          <span className="text-lg badge badge-neutral">No Map Provided</span>
        )}
      </div>
    </div>
  );
};

export default MapIFrame;
