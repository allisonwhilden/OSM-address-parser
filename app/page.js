"use client";
import { useState, useRef } from "react";
import {
  Textarea,
  useInput,
  Button,
  Spacer,
  createTheme,
  NextUIProvider,
  Container,
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

  // Controlled for input
  const {
    value: controlledValue,
    setValue: setControlledValue,
    reset,
    bindings,
  } = useInput("15946 Redmond Way, Suite 103 Redmond, WA 98052");

  // Ref for output
  const outputTextAreaRef = useRef(null);
  const onPress = () => {
    if (outputTextAreaRef.current) {
      navigator.clipboard.writeText(outputTextAreaRef.current.value);
    }
  };

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
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <Textarea
              {...bindings}
              width={"100%"}
              label="Address to parse"
              minRows={2}
            />
            <Spacer y={1} />
            <Textarea
              readOnly
              bordered
              ref={outputTextAreaRef}
              label="Output"
              width={"100%"}
              minRows={6}
              value={`addr:housenumber  ${
                parser.parseLocation(bindings.value).number
              }
addr:street       ${parser.parseLocation(bindings.value).street}
addr:unit        ${parser.parseLocation(bindings.value).sec_unit_num} 
addr:city         ${parser.parseLocation(bindings.value).city}
addr:state        ${parser.parseLocation(bindings.value).state}
addr:postcode     ${parser.parseLocation(bindings.value).zip}
        `}
            />

            <Spacer y={1} />
            <Button
              rounded
              color="secondary"
              flat
              icon={<Copy outline="currentColor" />}
              onPress={onPress}
            >
              Copy
            </Button>
          </div>
        </Container>
      </NextUIProvider>
    </NextThemesProvider>
  );
}
