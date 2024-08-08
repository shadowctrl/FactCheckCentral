export default function Loading() {
  return (
    <div className="h-[20vh] flex flex-col items-center justify-center text-center">
      <h3 className="text-2xl text-center font-mono font-semibold flex items-center p-4">
        Processing your Request. Please wait&nbsp;<p className="loader"> </p>
      </h3>
    </div>
  );
}
