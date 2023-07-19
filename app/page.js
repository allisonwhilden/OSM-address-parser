"use client";
import { useRef, useEffect, useState } from "react";
import {
  Textarea,
  useInput,
  Button,
  Spacer,
  createTheme,
  NextUIProvider,
  Container,
  Text,
  Link,
  Tooltip,
} from "@nextui-org/react";
import { Copy, GithubCircle } from "iconoir-react";
var parser = require("./address.js");
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Image from "next/image";

const lightTheme = createTheme({
  type: "light",
});

const darkTheme = createTheme({
  type: "dark",
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Controlled for input
  const {
    value: controlledValue,
    setValue: setControlledValue,
    reset,
    bindings,
  } = useInput(
    "15946 North Redmond Way Northeast, Suite 103 Redmond, WA 98052"
  );

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
    <div style={{ visibility: !mounted ? "hidden" : "" }}>
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
                <Text>
                  Enter an address to convert it to both JOSM and iD tag
                  structure for entering it into the OpenStreetMap database.
                  Make sure to review each tag for accuracy and completeness.
                </Text>
                <Text color="secondary">
                  Reminder: Abbreviations in street names should be expanded to
                  conform to OpenStreetMap style.
                </Text>
              </Container>
              <Spacer y={2} />
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
                  label="OpenStreetMap tags"
                  width={"100%"}
                  value={
                    bindings.value
                      ? `${
                          parsed.number
                            ? `addr:housenumber=${parsed.number?.trim()}\n`
                            : ""
                        }${
                          parsed.street
                            ? `addr:street=${
                                parsed.prefix ? parsed.prefix?.trim() : ""
                              } ${parsed.street?.trim()} ${
                                parsed.type ? parsed.type?.trim() : ""
                              } ${parsed.suffix ? parsed.suffix?.trim() : ""}`
                            : ""
                        }${
                          parsed.sec_unit_num
                            ? `\naddr:unit=${parsed.sec_unit_num?.trim()}`
                            : ""
                        }${
                          parsed.city
                            ? `\naddr:city=${parsed.city?.trim()}`
                            : ""
                        }${
                          parsed.state
                            ? `\naddr:state=${parsed.state?.trim()}`
                            : ""
                        }${
                          parsed.zip
                            ? `\naddr:postcode=${parsed.zip?.trim()}`
                            : ""
                        }`
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
              </Container>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100px",
                  marginTop: "20px",
                }}
              >
                <Tooltip
                  content={"View repository on Github"}
                  rounded
                  color="invert"
                >
                  <Link
                    color="text"
                    href="https://github.com/allisonwhilden/OSM-address-parser"
                    target="_blank"
                  >
                    <GithubCircle />
                  </Link>
                </Tooltip>
              </div>
            </div>
          </Container>
        </NextUIProvider>
      </NextThemesProvider>
    </div>
  );
}
