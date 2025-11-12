import GridCellSVG from "./svg/gridSvg";
import GridLayout from "./ui/grid";

export function VerticalSeperator() {
  return (
    <GridLayout className="h-full">
      <div className="grid grid-cols-1">
        <div className="relative h-10 w-full col-span-1">
          <div className="absolute w-full h-full top-0">
            <GridCellSVG />
          </div>
        </div>
      </div>
    </GridLayout>
  );
}

export function HorizontalSeperator() {
  return (
    <GridLayout className="h-full">
      <div className="grid grid-cols-1">
        <div className="relative w-10 h-full col-span-1">
          <div className="absolute w-full h-full top-0">
            <GridCellSVG />
          </div>
        </div>
      </div>
    </GridLayout>
  );
}
