import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { AVAILABLE_MODELS, openaiToCli } from "./openai-to-cli.js";

describe("Claude request model policy", () => {
  it("passes every supported model ID to Claude unchanged", () => {
    for (const model of AVAILABLE_MODELS) {
      const input = openaiToCli({
        model,
        messages: [{ role: "user", content: "Hello" }],
      });

      assert.equal(input.model, model);
    }
  });

  it("accepts provider-prefixed forms of supported model IDs", () => {
    const input = openaiToCli({
      model: "claude-code-cli/claude-fable-5",
      messages: [{ role: "user", content: "Hello" }],
    });

    assert.equal(input.model, "claude-fable-5");
  });

  it("rejects models outside the allowlist", () => {
    assert.throws(
      () => openaiToCli({
        model: "claude-haiku-4",
        messages: [{ role: "user", content: "Hello" }],
      }),
      /Unsupported model/
    );
  });
});
