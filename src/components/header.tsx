import GridLayout from "./ui/grid";

export default function NavHeader() {
  return (
    <GridLayout>
      <div className="w-full flex justify-between p-3">
        <div className="w-fit">
          <h1 className="font-semibold text-xl">
            BERTO <span className="text-blue-500">STORE</span>
          </h1>
        </div>
      </div>
    </GridLayout>
  );
}
