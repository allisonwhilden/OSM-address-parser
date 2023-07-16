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
  Text,
} from "@nextui-org/react";
import { Copy } from "iconoir-react";
var parser = require("parse-address");
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";
import Image from "next/image";

const lightTheme = createTheme({
  type: "light",
});

const darkTheme = createTheme({
  type: "dark",
});

export default function Home() {
  // Controlled for input
  const {
    value: controlledValue,
    setValue: setControlledValue,
    reset,
    bindings,
  } = useInput("15946 Redmond Way, Suite 103 Redmond, WA 98052");
  console.log(bindings);

  // Ref for output
  const outputJOSMTextAreaRef = useRef(null);
  const onPressJOSM = () => {
    if (outputJOSMTextAreaRef.current) {
      navigator.clipboard.writeText(outputJOSMTextAreaRef.current.value);
    }
  };
  const outputiDTextAreaRef = useRef(null);
  const onPressiD = () => {
    if (outputiDTextAreaRef.current) {
      navigator.clipboard.writeText(outputiDTextAreaRef.current.value);
    }
  };
  var parsed = bindings.value ? parser.parseLocation(bindings.value) : "";

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
              justifyContent: "start",
              height: "100vh",
              width: "100%",
            }}
          >
            <Image
              src="/addressparser.svg"
              alt="Address Parser image"
              width={500}
              height={500}
            />
            <Container>
              <Text h2>OSM Address Parser</Text>
              <Text>Description text goes here</Text>
            </Container>
            <Spacer y={1} />
            <Container>
              <Textarea
                bordered
                {...bindings}
                width={"100%"}
                label="Address to parse"
                minRows={2}
                shadow={false}
                animated={false}
              />
              <Spacer y={2} />
              <Textarea
                readOnly
                ref={outputJOSMTextAreaRef}
                label="JOSM Structure"
                width={"100%"}
                value={
                  bindings.value
                    ? `addr:housenumber  ${parsed.number}
addr:street       ${parsed.street}
addr:unit        ${parsed.sec_unit_num} 
addr:city         ${parsed.city}
addr:state        ${parsed.state}
addr:postcode     ${parsed.zip}`
                    : ""
                }
              />

              <Spacer y={1} />
              <Button
                rounded
                color="secondary"
                flat
                icon={<Copy outline="currentColor" />}
                onPress={onPressJOSM}
              >
                Copy
              </Button>
              <Spacer y={2} />
              <Textarea
                readOnly
                ref={outputiDTextAreaRef}
                label="iD Structure"
                width={"100%"}
                value={
                  bindings.value
                    ? `addr:housenumber=${parsed.number}
addr:street=${parsed.street}
addr:unit=${parsed.sec_unit_num} 
addr:city=${parsed.city}
addr:state=${parsed.state}
addr:postcode=${parsed.zip}`
                    : ""
                }
              />

              <Spacer y={1} />
              <Button
                rounded
                color="secondary"
                flat
                icon={<Copy outline="currentColor" />}
                onPress={onPressiD}
              >
                Copy
              </Button>
            </Container>
          </div>
        </Container>
      </NextUIProvider>
    </NextThemesProvider>
  );
}
