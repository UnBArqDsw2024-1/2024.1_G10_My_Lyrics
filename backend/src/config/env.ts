import { z } from "zod";
import "dotenv/config";

type Colors = "red" | "green" | "yellow";
function ColoredText(text: string, color: Colors) {
  const colorCode = {
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
  } as const;

  return `${colorCode[color]}${text}\x1b[0m`;
}

const envSchema = z.object({
  PORT: z.string().regex(/^\d+$/).transform(Number).default("3333"),
  NODE_ENV: z.enum(["dev", "production"]).default("dev"),
  DATABASE_URL: z.string().url(),
});

const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.log(ColoredText("Error when trying to validate .env", "red"));
  console.log(
    ColoredText(
      "Please, create and validate .env file in the root of project\n",
      "yellow",
    ),
  );
  for (const [error, message] of Object.entries(_env.error.format())) {
    if (error === "_errors") {
      continue;
    }

    const formattedMessage = (message as { _errors: string[] })._errors.join(
      ", ",
    );

    console.log(
      `${ColoredText(error, "green")} - ${ColoredText(formattedMessage, "red")}`,
    );
  }
  process.exit(1);
}

export const env = _env.data;
