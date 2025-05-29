type TerminalLettersProps = {
  letters: string;
  cursorPosition?: number;
  isCurrent?: boolean;
};

export const TerminalLetters = ({
  letters,
  cursorPosition = -1,
  isCurrent = false,
}: TerminalLettersProps) => {
  const patchedLetters = letters.split("").map((char) => {
    if (char === " ") {
      return "\u00A0";
    }

    return char;
  });

  return (
    <>
      {patchedLetters.map((char, index) => {
        let className = "";

        if (index === cursorPosition && isCurrent) {
          className = "bg-gray-500 cursor";
        }

        return (
          <span key={index} className={className}>
            {char}
          </span>
        );
      })}
    </>
  );
};
