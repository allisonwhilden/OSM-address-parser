"use client";
import { useRef } from "react";
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
                Enter an address to convert it to both JOSM and iD tag structure
                for entering it into the Open Street Map database.
              </Text>
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
                    ? `addr:housenumber  ${parsed.number?.trim()}
addr:street       ${parsed.prefix?.trim()} ${parsed.street?.trim()} ${parsed.type?.trim()} ${parsed.suffix?.trim()}
addr:unit        ${parsed.sec_unit_num?.trim()} 
addr:city         ${parsed.city?.trim()}
addr:state        ${parsed.state?.trim()}
addr:postcode     ${parsed.zip?.trim()}`
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
                    ? `addr:housenumber=${parsed.number?.trim()}
addr:street=${parsed.prefix?.trim()} ${parsed.street?.trim()} ${parsed.type?.trim()} ${parsed.suffix?.trim()}
addr:unit=${parsed.sec_unit_num?.trim()} 
addr:city=${parsed.city?.trim()}
addr:state=${parsed.state?.trim()}
addr:postcode=${parsed.zip?.trim()}`
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
        </Container>
      </NextUIProvider>
    </NextThemesProvider>
  );
}
