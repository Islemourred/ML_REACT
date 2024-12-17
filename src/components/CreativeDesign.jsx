import React from "react";

export default function CreativeDesign({ yield_amount, message }) {
  return (
    <div
      className={`h-full w-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center`}
    >
      <div
        className={`text-white text-center ${
          yield_amount ? "text-5xl" : "text-4xl"
        } font-bold animate-pulse`}
      >
        {!message
          ? yield_amount
            ? yield_amount
            : "Fill the form... to see the yield"
          : message}
      </div>
    </div>
  );
}
