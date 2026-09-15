"use client";
import { useRef, useEffect, useState } from "react";
import {
  Textarea,
  Button,
  NextUIProvider,
  Link,
  Tooltip,
} from "@nextui-org/react";
import { Copy, GithubCircle } from "iconoir-react";
var parser = require("./address.js");
var { expandStreetParts } = require("./abbreviations.js");
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Image from "next/image";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Controlled input value
  const [inputValue, setInputValue] = useState(
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
  var parsed = inputValue
    ? expandStreetParts(parser.parseLocation(inputValue))
    : "";

  return (
    <div style={{ visibility: !mounted ? "hidden" : "" }}>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
      >
        <NextUIProvider>
          <div className="container mx-auto px-4">
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
              <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">OSM Address Parser</h2>
                <p className="mb-2">
                  Enter an address to convert it to both JOSM and iD tag
                  structure for entering it into the OpenStreetMap database.
                  Make sure to review each tag for accuracy and completeness.
                </p>
                <p className="text-secondary mb-4">
                  Note: Common abbreviations in street names are automatically
                  expanded to conform to OpenStreetMap style.
                </p>
              </div>
              <div className="mb-8"></div>
              <div className="w-full max-w-4xl">
                <Textarea
                  value={inputValue}
                  onValueChange={setInputValue}
                  className="w-full"
                  label="Address to parse"
                  minRows={2}
                />
                <div className="mb-8"></div>
                <Textarea
                  readOnly
                  ref={outputJOSMTextAreaRef}
                  label="OpenStreetMap tags"
                  className="w-full"
                  value={
                    inputValue
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

                <div className="mb-4"></div>
                <Button
                  color="secondary"
                  variant="flat"
                  startContent={<Copy />}
                  onPress={onPressJOSM}
                >
                  Copy
                </Button>
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
                <Tooltip content="View repository on Github">
                  <Link
                    href="https://github.com/allisonwhilden/OSM-address-parser"
                    target="_blank"
                  >
                    <GithubCircle />
                  </Link>
                </Tooltip>
              </div>
            </div>
          </div>
        </NextUIProvider>
      </NextThemesProvider>
    </div>
  );
}
