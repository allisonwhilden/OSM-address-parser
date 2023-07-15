"use client";
import { useState } from "react";
import {
  Textarea,
  useInput,
  Button,
  Spacer,
  createTheme,
  NextUIProvider,
} from "@nextui-org/react";
import { Copy } from "iconoir-react";
var parser = require("parse-address");
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";

const lightTheme = createTheme({
  type: "light",
});

const darkTheme = createTheme({
  type: "dark",
});

export default function Home() {
  const [address, setAddress] = useState(
    "15946 Redmond Way, Suite 103 Redmond, WA 98052"
  );
  var parsed = parser.parseLocation(address);

  // Controlled
  const {
    value: controlledValue,
    setValue: setControlledValue,
    reset,
    bindings,
  } = useInput("15946 Redmond Way, Suite 103 Redmond, WA 98052");

  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Textarea
            {...bindings}
            width={500}
            label="Address to parse"
            minRows={2}
          />
          <Spacer y={1} />
          <Textarea
            readOnly
            label="Output"
            width={500}
            minRows={6}
            value={`addr:housenumber  ${
              parser.parseLocation(bindings.value).number
            }
addr:street       ${parser.parseLocation(bindings.value).street}
addr:unit	  ???
addr:city         ${parser.parseLocation(bindings.value).city}
addr:state        ${parser.parseLocation(bindings.value).state}
addr:postcode     ${parser.parseLocation(bindings.value).zip}
        `}
          />

          <Spacer y={1} />
          <Button iconRight={<Copy outline="currentColor" />}></Button>
        </div>
      </NextUIProvider>
    </NextThemesProvider>
  );
}
