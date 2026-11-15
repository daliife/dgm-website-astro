import { describe, expect, it } from "vitest";
import { boardWidth, padToBoard } from "../../utils/splitFlap";

describe("split flap board", () => {
  const phrases = [
    "DESENVOLUPADOR FRONTEND",
    "CLARINETISTA",
    "AMANT DE LA NATURA",
  ];

  it("reserves the longest phrase", () => {
    expect(boardWidth(phrases)).toBe("DESENVOLUPADOR FRONTEND".length);
  });

  it("pads a shorter phrase with spaces and trims past the board", () => {
    const width = boardWidth(phrases);
    expect(padToBoard("CLARINETISTA", width)).toBe(
      "CLARINETISTA".padEnd(width),
    );
    expect(padToBoard(`${phrases[0]} EXTRA`, width)).toHaveLength(width);
  });
});
